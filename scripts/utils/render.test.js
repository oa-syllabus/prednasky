import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderCourseIndexHtml, renderHubIndexHtml, renderReadmeSection } from './render.js'
import { computeLiveUrl } from './paths.js'

test('renderCourseIndexHtml lists every entry with a link and PDF link', () => {
    const html = renderCourseIndexHtml({
        title: 'PVA2 | Programování a vývoj aplikací',
        entries: [{ name: '01_uvod_do_python', title: 'Úvod do Pythonu' }],
        year: 2026,
    })

    assert.match(html, /PVA2 \| Programování a vývoj aplikací/)
    assert.match(html, /href="\.\/01_uvod_do_python"/)
    assert.match(html, /href="\.\/01_uvod_do_python\/01_uvod_do_python\.pdf"/)
})

test('renderCourseIndexHtml escapes HTML-special characters in title and entry title', () => {
    const html = renderCourseIndexHtml({
        title: 'Kurz <script>alert(1)</script> & "uvozovky"',
        entries: [{ name: '01_x', title: 'Přednáška <b>tučně</b> & víc' }],
        year: 2026,
    })

    assert.doesNotMatch(html.replace(/<!DOCTYPE html>/, ''), /<script>alert/)
    assert.match(html, /Kurz &lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; &quot;uvozovky&quot;/)
    assert.match(html, /Přednáška &lt;b&gt;tučně&lt;\/b&gt; &amp; víc/)
})

test('renderCourseIndexHtml links theme.css, theme-toggle.js and logo.png one level up', () => {
    const html = renderCourseIndexHtml({ title: 'X', entries: [], year: 2026 })

    assert.match(html, /href="\.\.\/theme\.css"/)
    assert.match(html, /href="\.\.\/logo\.png"/)
    assert.match(html, /src="\.\.\/theme-toggle\.js"/)
})

test('renderCourseIndexHtml pins the Bootstrap link with an SRI integrity attribute', () => {
    const html = renderCourseIndexHtml({ title: 'X', entries: [], year: 2026 })

    assert.match(html, /bootstrap\.min\.css"[^>]*integrity="sha384-[A-Za-z0-9+\/=]+"/)
    assert.match(html, /crossorigin="anonymous"/)
})

test('renderCourseIndexHtml never reuses the Bootstrap-colliding .row class name', () => {
    const html = renderCourseIndexHtml({
        title: 'X',
        entries: [{ name: '01_a', title: 'A' }],
        year: 2026,
    })

    assert.match(html, /class="deck-row"/)
    assert.doesNotMatch(html, /class="row"/)
})

test('renderHubIndexHtml lists every course with a link and entry count', () => {
    const html = renderHubIndexHtml({
        courses: [{ id: 'scm', title: 'SCM | Programování a vývoj aplikací', entryCount: 6 }],
        year: 2026,
    })

    assert.match(html, /href="\.\/scm\/"/)
    assert.match(html, /6 přednášek/)
})

test('renderHubIndexHtml escapes HTML-special characters in course title', () => {
    const html = renderHubIndexHtml({
        courses: [{ id: 'x', title: 'Kurz <b>zlý</b> & "uvozovky"', entryCount: 1 }],
        year: 2026,
    })

    assert.match(html, /Kurz &lt;b&gt;zlý&lt;\/b&gt; &amp; &quot;uvozovky&quot;/)
})

test('renderHubIndexHtml links theme.css and theme-toggle.js at the same level', () => {
    const html = renderHubIndexHtml({ courses: [], year: 2026 })

    assert.match(html, /href="theme\.css"/)
    assert.match(html, /src="theme-toggle\.js"/)
})

test('renderHubIndexHtml never reuses Bootstrap-colliding class names', () => {
    const html = renderHubIndexHtml({
        courses: [{ id: 'x', title: 'X', entryCount: 1 }],
        year: 2026,
    })

    assert.match(html, /class="deck-card"/)
    assert.match(html, /class="deck-cards"/)
    assert.doesNotMatch(html, /class="card"/)
    assert.doesNotMatch(html, /class="cards"/)
})

test('renderReadmeSection renders a markdown table with live and PDF links using the provided width', () => {
    const md = renderReadmeSection({
        course: { id: 'scm', title: 'SCM' },
        entries: [{ name: '10_markdown', title: 'Markdown' }],
        ghPagesUrl: 'https://oa-syllabus.github.io/',
        repoName: 'prednasky',
        computeLiveUrl,
        width: 2,
    })

    assert.match(md, /## SCM/)
    assert.match(md, /\| 01 \|/)
    assert.match(md, /\[Markdown\]\(https:\/\/oa-syllabus\.github\.io\/prednasky\/scm\/10_markdown\/\)/)
})

test('renderReadmeSection escapes pipe characters in course and entry titles', () => {
    const md = renderReadmeSection({
        course: { id: 'x', title: 'PVA2 | Programování' },
        entries: [{ name: '01_a', title: 'Kurz | s čárou' }],
        ghPagesUrl: 'https://oa-syllabus.github.io/',
        repoName: 'prednasky',
        computeLiveUrl,
        width: 2,
    })

    assert.match(md, /## PVA2 \\\| Programování/)
    assert.match(md, /Kurz \\\| s čárou/)
})
