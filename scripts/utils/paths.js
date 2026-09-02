export function computeViteBase(repoName, courseId, slideName) {
    return `/${repoName}/${courseId}/${slideName}/`
}

export function computeCourseBaseUrl(ghPagesUrl, repoName, courseId) {
    return `${ghPagesUrl}${repoName}/${courseId}/`
}

export function computeLiveUrl(ghPagesUrl, repoName, courseId, slideName) {
    return `${computeCourseBaseUrl(ghPagesUrl, repoName, courseId)}${slideName}/`
}
