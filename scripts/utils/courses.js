import fs from 'node:fs/promises'

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0
}

function validateSectionOrder(course, configPath) {
    const { sectionOrder } = course
    if (sectionOrder === undefined) {
        return
    }

    if (!Array.isArray(sectionOrder)) {
        throw new Error(`courses.config.json: "sectionOrder" kurzu "${course.id}" musí být pole názvů sekcí: ${configPath}`)
    }
    const seen = new Set()
    for (const title of sectionOrder) {
        if (!isNonEmptyString(title)) {
            throw new Error(`courses.config.json: "sectionOrder" kurzu "${course.id}" obsahuje prázdný název sekce: ${configPath}`)
        }
        if (seen.has(title)) {
            throw new Error(`courses.config.json: "sectionOrder" kurzu "${course.id}" uvádí sekci "${title}" dvakrát: ${configPath}`)
        }
        seen.add(title)
    }
}

export async function loadCoursesConfig(configPath) {
    const raw = await fs.readFile(configPath, 'utf8')

    let parsed
    try {
        parsed = JSON.parse(raw)
    } catch (err) {
        throw new Error(`courses.config.json obsahuje neplatný JSON (${configPath}): ${err.message}`)
    }

    if (!isNonEmptyString(parsed.repoName)) {
        throw new Error(`courses.config.json neobsahuje platné "repoName": ${configPath}`)
    }
    if (!isNonEmptyString(parsed.ghPagesUrl)) {
        throw new Error(`courses.config.json neobsahuje platné "ghPagesUrl": ${configPath}`)
    }
    if (!Array.isArray(parsed.courses) || parsed.courses.length === 0) {
        throw new Error(`courses.config.json neobsahuje žádné kurzy: ${configPath}`)
    }
    for (const course of parsed.courses) {
        if (!isNonEmptyString(course?.id)) {
            throw new Error(`courses.config.json obsahuje kurz bez platného "id": ${configPath}`)
        }
        if (!isNonEmptyString(course?.title)) {
            throw new Error(`courses.config.json obsahuje kurz (id: ${course.id}) bez platného "title": ${configPath}`)
        }
        validateSectionOrder(course, configPath)
    }

    return parsed
}
