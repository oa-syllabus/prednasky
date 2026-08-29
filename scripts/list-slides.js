import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadCoursesConfig } from './utils/courses.js'
import { listSlidesByCourse } from './utils/listSlides.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const rootDir    = path.resolve(__dirname, '..')

const config = await loadCoursesConfig(path.resolve(rootDir, 'courses.config.json'))
const perCourse = await listSlidesByCourse({ config, rootDir })

const flat = perCourse.flatMap(({ course, entries }) =>
    entries.map(entry => ({ course: course.id, name: entry.name })),
)

console.log(JSON.stringify(flat))
