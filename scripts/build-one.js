#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadCoursesConfig } from './utils/courses.js'
import { getSlidesSorted } from './utils/slides.js'
import { buildSlide, SHARED_CACHE } from './utils/buildSlide.js'
import { slidesDir } from './utils/coursePaths.js'

const [, , courseId, slideName] = process.argv
if (!courseId || !slideName) {
    console.error('Usage: node scripts/build-one.js <courseId> <slideName>')
    process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const rootDir    = path.resolve(__dirname, '..')

const config = await loadCoursesConfig(path.resolve(rootDir, 'courses.config.json'))
const course = config.courses.find(c => c.id === courseId)
if (!course) {
    throw new Error(`Neznámý kurz "${courseId}" (courses.config.json)`)
}

const entries = await getSlidesSorted(slidesDir(rootDir, courseId))
const entry = entries.find(e => e.name === slideName)
if (!entry) {
    throw new Error(`Deck "${slideName}" nenalezen v kurzu "${courseId}" (prohledáváno: ${slidesDir(rootDir, courseId)})`)
}

await fs.mkdir(path.join(rootDir, SHARED_CACHE), { recursive: true })

await buildSlide({ course, entry, config, rootDir })
console.log(`✅ build hotovo: ${courseId}/${slideName}`)
