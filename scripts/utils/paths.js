export function computeViteBase(repoName, courseId, slideName) {
    return `/${repoName}/${courseId}/${slideName}/`
}

export function computeLiveUrl(ghPagesUrl, repoName, courseId, slideName) {
    return `${ghPagesUrl}${repoName}/${courseId}/${slideName}/`
}
