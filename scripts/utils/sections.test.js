import { test } from 'node:test'
import assert from 'node:assert/strict'
import { groupBySection, UNSECTIONED_TITLE } from './sections.js'

// Zkratka: v testech nás z celé entry zajímá jen name a section.
function deck(name, section = null) {
    return { name, title: name, section }
}

test('groupBySection returns one untitled group when no deck declares a section', () => {
    const entries = [deck('01_a'), deck('02_b')]

    const groups = groupBySection(entries)

    assert.equal(groups.length, 1)
    assert.equal(groups[0].title, null)
    assert.deepEqual(groups[0].entries.map(e => e.name), ['01_a', '02_b'])
})

test('groupBySection groups decks by section in first-occurrence order when no sectionOrder is given', () => {
    const entries = [deck('02_php', 'PHP'), deck('20_db', 'Databáze'), deck('03_php', 'PHP')]

    const groups = groupBySection(entries)

    assert.deepEqual(groups.map(g => g.title), ['PHP', 'Databáze'])
    assert.deepEqual(groups[0].entries.map(e => e.name), ['02_php', '03_php'])
})

test('groupBySection orders groups by sectionOrder', () => {
    const entries = [deck('02_php', 'PHP'), deck('20_db', 'Databáze'), deck('40_oop', 'OOP')]

    const groups = groupBySection(entries, ['Databáze', 'PHP', 'OOP'])

    assert.deepEqual(groups.map(g => g.title), ['Databáze', 'PHP', 'OOP'])
})

test('groupBySection appends sections missing from sectionOrder after the listed ones', () => {
    const entries = [deck('02_php', 'PHP'), deck('20_db', 'Databáze'), deck('40_oop', 'OOP')]

    const groups = groupBySection(entries, ['Databáze'])

    assert.deepEqual(groups.map(g => g.title), ['Databáze', 'PHP', 'OOP'])
})

test('groupBySection puts decks without a section into the "Ostatní" group at the end', () => {
    const entries = [deck('99_x'), deck('02_php', 'PHP')]

    const groups = groupBySection(entries)

    assert.deepEqual(groups.map(g => g.title), ['PHP', UNSECTIONED_TITLE])
    assert.deepEqual(groups[1].entries.map(e => e.name), ['99_x'])
})

test('groupBySection keeps the "Ostatní" group last even when sectionOrder omits everything else', () => {
    const entries = [deck('99_x'), deck('02_php', 'PHP'), deck('20_db', 'Databáze')]

    const groups = groupBySection(entries, ['Databáze'])

    assert.equal(groups.at(-1).title, UNSECTIONED_TITLE)
})

test('groupBySection throws when sectionOrder names a section no deck declares', () => {
    const entries = [deck('20_db', 'Databáze')]

    assert.throws(() => groupBySection(entries, ['Databaze']), (err) => {
        assert.match(err.message, /Databaze/)
        return true
    })
})

test('groupBySection error names the sections that do exist, so a typo is obvious', () => {
    const entries = [deck('20_db', 'Databáze'), deck('02_php', 'PHP')]

    assert.throws(() => groupBySection(entries, ['Databaze']), (err) => {
        assert.match(err.message, /Databáze/)
        assert.match(err.message, /PHP/)
        return true
    })
})

test('groupBySection returns no groups for an empty entry list', () => {
    assert.deepEqual(groupBySection([]), [])
})
