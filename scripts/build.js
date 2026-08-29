import fs from 'node:fs'
import fse from 'fs-extra'
import path from 'node:path'
import { rimraf } from 'rimraf'
import { fileURLToPath } from 'node:url'
import { loadCoursesConfig } from './utils/courses.js'
import { listSlidesByCourse } from './utils/listSlides.js'
import { buildSlide, SHARED_CACHE } from './utils/buildSlide.js'
import { distDir, slidesDir } from './utils/coursePaths.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const rootDir = path.resolve(__dirname, '..')

const config = await loadCoursesConfig(path.resolve(rootDir, 'courses.config.json'))

// 0) clean root/dist + zajisti shared cache
await rimraf(distDir(rootDir))
await fse.ensureDir(distDir(rootDir))
await fse.ensureDir(path.join(rootDir, SHARED_CACHE))

console.log('📃 ============ ...')
console.log('📃 build slides (sequential, optimized) ...')
console.log('📃 ============ ...')

const perCourse = await listSlidesByCourse({ config, rootDir })

for (const { course, entries, totalCount } of perCourse) {
    if (totalCount === 0) {
        throw new Error(`Kurz "${course.id}" neobsahuje žádné přednášky (prohledáváno: ${slidesDir(rootDir, course.id)})`)
    }

    for (const entry of entries) {
        await buildSlide({ course, entry, config, rootDir })
    }
}

console.log('\n🎉  build success')
