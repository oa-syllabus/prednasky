import path from 'node:path'

export function distDir(rootDir) {
    return path.resolve(rootDir, 'dist')
}

export function slidesDir(rootDir, courseId) {
    return path.resolve(rootDir, 'courses', courseId, 'slides')
}

export function courseComponentsDir(rootDir, courseId) {
    return path.resolve(rootDir, 'courses', courseId, 'components')
}

export function courseDistDir(rootDir, courseId) {
    return path.join(distDir(rootDir), courseId)
}

export function slideDistDir(rootDir, courseId, slideName) {
    return path.join(courseDistDir(rootDir, courseId), slideName)
}
