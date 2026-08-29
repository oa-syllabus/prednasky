import 'zx/globals'
import fs from 'node:fs'
import fse from 'fs-extra'
import path from 'node:path'
import { rimraf } from 'rimraf'
import { fileURLToPath } from 'node:url'
import { loadCoursesConfig } from './utils/courses.js'
import { getSlidesSorted } from './utils/slides.js'
import { computeViteBase } from './utils/paths.js'
import { mergeComponentsForSlide } from './utils/components.js'

if (process.platform === 'win32') {
    $.shell = 'powershell.exe'   // nebo 'pwsh.exe'
    $.prefix = ''
}

// ---- Konfigurace ----
const USE_SYMLINKS = true          // pro setup/ — když chceš raději kopírovat, dej false
const SHARED_CACHE = '.vite-cache' // do kořene repa
// ---------------------

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const rootDir           = path.resolve(__dirname, '..')
const distDir           = path.resolve(rootDir, 'dist')
const rootComponentsDir = path.resolve(rootDir, 'components')
const setupSrc          = path.resolve(rootDir, 'setup')

async function ensureLinkOrCopy(src, dest) {
    await rimraf(dest)
    if (!await fse.pathExists(src)) return
    if (USE_SYMLINKS) {
        const type = process.platform === 'win32' ? 'junction' : 'dir'
        await fse.ensureSymlink(src, dest, type)
    } else {
        await fse.copy(src, dest, { overwrite: true })
    }
}

function makeViteConfig(base, cacheRel) {
    // rychlý build: minify off, sourcemap off, shared cache
    return `import { defineConfig } from 'vite';
export default defineConfig({
  base: ${JSON.stringify(base)},
  cacheDir: '${cacheRel}',
  build: {
    minify: false,
    sourcemap: false,
    modulePreload: false,
    target: 'esnext',
  },
});
`
}

const config = await loadCoursesConfig(path.resolve(rootDir, 'courses.config.json'))

// 0) clean root/dist + zajisti shared cache
await rimraf(distDir)
await fse.ensureDir(distDir)
await fse.ensureDir(path.join(rootDir, SHARED_CACHE))

console.log('📃 ============ ...')
console.log('📃 build slides (sequential, optimized) ...')
console.log('📃 ============ ...')

for (const course of config.courses) {
    const slidesDir           = path.resolve(rootDir, 'courses', course.id, 'slides')
    const courseComponentsDir = path.resolve(rootDir, 'courses', course.id, 'components')
    const entries             = await getSlidesSorted(slidesDir)

    if (entries.length === 0) {
        throw new Error(`Kurz "${course.id}" neobsahuje žádné přednášky (prohledáváno: ${slidesDir})`)
    }

    for (const entry of entries) {
        const dir  = entry.dir
        const name = entry.name

        console.log(`\n📃 build slide: ${course.id}/${name}`)
        console.log(dir)

        // 1) dočasný vite.config.ts s base a sdílenou cache
        const viteConfigPath = path.join(dir, 'vite.config.ts')
        // z adresáře courses/<course>/slides/<name> je kořen ../../../../
        const cacheRel = '../../../../' + SHARED_CACHE
        await fs.promises.writeFile(
            viteConfigPath,
            makeViteConfig(computeViteBase(config.repoName, course.id, name), cacheRel),
            'utf8',
        )

        // 2) sdílené + kurz-specifické komponenty (merge, root vyhrává kolize), setup (symlink/kopie)
        await mergeComponentsForSlide({ slideDir: dir, rootComponentsDir, courseComponentsDir })
        await ensureLinkOrCopy(setupSrc, path.join(dir, 'setup'))

        // 3) build slajdu přímo přes CLI
        cd(dir)
        await $`pnpm exec slidev build`

        // 4) přesuň dist do root/dist/<course>/<name>
        const slideDist  = path.join(dir, 'dist')
        const targetDist = path.join(distDir, course.id, name)
        console.log('move to root dist:', targetDist)
        await rimraf(targetDist)
        await fse.move(slideDist, targetDist, { overwrite: true })

        // 5) úklid dočasného vite.config.ts + zahoď linkované složky
        await fs.promises.unlink(viteConfigPath).catch(() => {})
        await rimraf(path.join(dir, 'components'))
        await rimraf(path.join(dir, 'setup'))
    }
}

console.log('\n🎉  build success')
