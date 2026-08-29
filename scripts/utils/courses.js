import fs from 'node:fs/promises'

export async function loadCoursesConfig(configPath) {
    const raw = await fs.readFile(configPath, 'utf8')
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.courses) || parsed.courses.length === 0) {
        throw new Error(`courses.config.json neobsahuje žádné kurzy: ${configPath}`)
    }
    return parsed
}
