// Skupina pro přednášky, které v package.json sekci nemají. Kurz, kde ji nemá
// žádná z nich, se ale renderuje jako jeden nepojmenovaný blok — viz níže.
export const UNSECTIONED_TITLE = 'Ostatní'

// Rozdělí přednášky do bloků podle pole "section" v jejich package.json.
// Vrací pole objektů { title, entries }; title === null znamená kurz bez sekcí,
// který se má vykreslit jako dnes, tedy jako jeden souvislý seznam bez nadpisu.
//
// Pořadí bloků řídí sectionOrder z courses.config.json. Bloky, které v něm
// nejsou uvedené, jdou za vyjmenované v pořadí prvního výskytu; "Ostatní" je
// vždy poslední.
export function groupBySection(entries, sectionOrder = []) {
    if (entries.length === 0) {
        return []
    }

    if (!entries.some(entry => entry.section)) {
        return [{ title: null, entries: [...entries] }]
    }

    const byTitle = new Map()
    for (const entry of entries) {
        const title = entry.section ?? UNSECTIONED_TITLE
        if (!byTitle.has(title)) {
            byTitle.set(title, [])
        }
        byTitle.get(title).push(entry)
    }

    // Překlep v sectionOrder by jinak blok tiše shodil na konec výpisu.
    const unknown = sectionOrder.filter(title => !byTitle.has(title))
    if (unknown.length > 0) {
        throw new Error(
            `"sectionOrder" odkazuje na neexistující sekce: ${unknown.map(t => `"${t}"`).join(', ')}. `
            + `Kurz obsahuje sekce: ${[...byTitle.keys()].map(t => `"${t}"`).join(', ')}`,
        )
    }

    const rest = [...byTitle.keys()].filter(title => !sectionOrder.includes(title))
    const ordered = [...sectionOrder, ...rest].filter(title => title !== UNSECTIONED_TITLE)
    if (byTitle.has(UNSECTIONED_TITLE)) {
        ordered.push(UNSECTIONED_TITLE)
    }

    return ordered.map(title => ({ title, entries: byTitle.get(title) }))
}
