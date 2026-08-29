import { getSlidesSorted } from './slides.js'
import { slidesDir } from './coursePaths.js'

export const SKIP_TALKS = ['00_skeleton', '00_uvodni_hodina']

export async function listSlidesByCourse({ config, rootDir, skipTalks = SKIP_TALKS }) {
    const result = []
    for (const course of config.courses) {
        const all = await getSlidesSorted(slidesDir(rootDir, course.id))
        const entries = all.filter(e => !skipTalks.includes(e.folder))
        result.push({ course, entries, totalCount: all.length })
    }
    return result
}

// Guards against a course directory that genuinely lost all its decks — distinct
// from a course whose decks were all filtered out by skipTalks (totalCount > 0
// but entries is empty), which is expected and must NOT throw here.
export function assertNoEmptyCourses(perCourse) {
    for (const { course, totalCount } of perCourse) {
        if (totalCount === 0) {
            throw new Error(`Kurz "${course.id}" neobsahuje žádné přednášky`)
        }
    }
}
