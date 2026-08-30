// scripts/build-index.js
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fse from 'fs-extra'
import { loadCoursesConfig } from './utils/courses.js'
import { computeLiveUrl } from './utils/paths.js'
import { renderCourseIndexHtml, renderHubIndexHtml, renderReadmeSection } from './utils/render.js'
import { listSlidesByCourse } from './utils/listSlides.js'
import { distDir, courseDistDir } from './utils/coursePaths.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const rootDir = path.resolve(__dirname, '..')

const OUTPUT_PATH = distDir(rootDir)
const PUBLIC_PATH = path.resolve(rootDir, 'public')
const currentYear = new Date().getFullYear()

console.log('📃 build index & readme ...')

const config = await loadCoursesConfig(path.resolve(rootDir, 'courses.config.json'))
await fse.ensureDir(OUTPUT_PATH)

const readmeSections = []
const hubCourses = []

const perCourse = await listSlidesByCourse({ config, rootDir })
const width = String(Math.max(...perCourse.map(({ entries }) => entries.length))).length

for (const { course, entries } of perCourse) {
    const courseDist = courseDistDir(rootDir, course.id)
    await fse.ensureDir(courseDist)
    await fs.writeFile(
        path.join(courseDist, 'index.html'),
        renderCourseIndexHtml({ title: course.title, entries, year: currentYear }),
    )

    hubCourses.push({ id: course.id, title: course.title, entryCount: entries.length })
    readmeSections.push(renderReadmeSection({ course, entries, ghPagesUrl: config.ghPagesUrl, repoName: config.repoName, computeLiveUrl, width }))

    console.log(`✅ ${course.id}/index.html hotovo (${entries.length} přednášek)`)
}

await fs.writeFile(
    path.join(OUTPUT_PATH, 'index.html'),
    renderHubIndexHtml({ courses: hubCourses, year: currentYear }),
)
console.log('✅ hub index.html hotovo')

await fs.writeFile(
    path.resolve(rootDir, 'README.md'),
    ['# Seznam přednášek', '', ...readmeSections].join('\n') + '\n',
    'utf8',
)
console.log('✅ README.md hotovo')

await fse.copy(path.join(PUBLIC_PATH, 'theme.css'), path.join(OUTPUT_PATH, 'theme.css'))
await fse.copy(path.join(PUBLIC_PATH, 'theme-toggle.js'), path.join(OUTPUT_PATH, 'theme-toggle.js'))
await fse.copy(path.join(PUBLIC_PATH, 'logo.png'), path.join(OUTPUT_PATH, 'logo.png'))
