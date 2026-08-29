// scripts/utils/buildSlide.js
import fs from 'node:fs'
import fse from 'fs-extra'
import path from 'node:path'
import { rimraf } from 'rimraf'
import { $, cd } from 'zx'
import { computeViteBase } from './paths.js'
import { mergeComponentsForSlide } from './components.js'
import { courseComponentsDir, slideDistDir } from './coursePaths.js'

if (process.platform === 'win32') {
    $.shell = 'powershell.exe'   // nebo 'pwsh.exe'
    $.prefix = ''
}

export const SHARED_CACHE = '.vite-cache' // do kořene repa

function makeViteConfig(base, cacheRel) {
    // rychlý build: minify off, sourcemap off, shared cache
    return `import { defineConfig } from 'vite';
export default defineConfig({
  base: ${JSON.stringify(base)},
  // Inert for production builds — Vite's dev-server dep pre-bundling cache only
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

async function ensureLinkOrCopy(src, dest, useSymlinks) {
    await rimraf(dest)
    if (!await fse.pathExists(src)) return
    if (useSymlinks) {
        const type = process.platform === 'win32' ? 'junction' : 'dir'
        await fse.ensureSymlink(src, dest, type)
    } else {
        await fse.copy(src, dest, { overwrite: true })
    }
}

export async function buildSlide({ course, entry, config, rootDir, useSymlinks = true }) {
    const dir  = entry.dir
    const name = entry.name

    const rootComponentsDir = path.resolve(rootDir, 'components')
    const setupSrc          = path.resolve(rootDir, 'setup')

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
    await mergeComponentsForSlide({ slideDir: dir, rootComponentsDir, courseComponentsDir: courseComponentsDir(rootDir, course.id) })
    await ensureLinkOrCopy(setupSrc, path.join(dir, 'setup'), useSymlinks)

    // 3) build slajdu přímo přes CLI
    cd(dir)
    await $`pnpm exec slidev build`

    // 4) přesuň dist do root/dist/<course>/<name>
    const slideDist  = path.join(dir, 'dist')
    const targetDist = slideDistDir(rootDir, course.id, name)
    console.log('move to root dist:', targetDist)
    await rimraf(targetDist)
    await fse.move(slideDist, targetDist, { overwrite: true })

    // 5) úklid dočasného vite.config.ts + zahoď linkované složky
    await fs.promises.unlink(viteConfigPath).catch(() => {})
    await rimraf(path.join(dir, 'components'))
    await rimraf(path.join(dir, 'setup'))
}
