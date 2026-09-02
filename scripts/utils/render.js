function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function escapeMdCell(value) {
    return String(value).replace(/\|/g, '\\|')
}

const BOOTSTRAP_SRI = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH'

const COPY_ICON_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M14 5H6a2 2 0 0 0-2 2v8" />'
    + '</svg>'

const CHECK_ICON_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M20 6 9 17l-5-5" />'
    + '</svg>'

// Dokument se šipkou dolů — od schránky odlišitelný na první pohled.
const PDF_ICON_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" />'
    + '<path d="M12 12v5" /><path d="m9.5 14.5 2.5 2.5 2.5-2.5" />'
    + '</svg>'

function renderCopyButton(url, entryTitle) {
    // Popisek nese název přednášky — čtečka jinak přečte u všech řádků totéž.
    const label = `Kopírovat odkaz na přednášku ${entryTitle}`
    return `<button class="deck-action copy" type="button" data-copy-url="${escapeHtml(url)}" aria-label="${escapeHtml(label)}" title="Kopírovat odkaz"><span class="copy-idle">${COPY_ICON_SVG}</span><span class="copy-done">${CHECK_ICON_SVG}</span></button>`
}

function renderPdfLink(name, entryTitle) {
    const label = `Stáhnout PDF přednášky ${entryTitle}`
    return `<a class="deck-action pdf" href="./${escapeHtml(name)}/${escapeHtml(name)}.pdf" aria-label="${escapeHtml(label)}" title="Stáhnout PDF">${PDF_ICON_SVG}</a>`
}

function renderTitlebar() {
    return `
    <div class="titlebar">
      <div class="dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
      <div class="path">prednasky</div>
      <div class="themebar">
        <button class="themebtn" data-theme-choice="auto">auto</button>
        <button class="themebtn" data-theme-choice="dark">tmavý</button>
        <button class="themebtn" data-theme-choice="light">světlý</button>
      </div>
    </div>`
}

export function renderCourseIndexHtml({ title, entries, year, liveBaseUrl }) {
    const width = String(entries.length).length
    const listHtml = entries.map((e, i) => {
        const n = String(i + 1).padStart(width, '0')
        // Bez liveBaseUrl zbyde relativní cesta — copy-link.js ji dopočítá proti location.href.
        const copyUrl = liveBaseUrl ? `${liveBaseUrl}${e.name}/` : `./${e.name}/`
        return `
      <div class="deck-row">
        <span class="idx">${n}</span>
        <a href="./${escapeHtml(e.name)}">${escapeHtml(e.title)}</a>
        <span class="deck-actions">${renderPdfLink(e.name, e.title)}${renderCopyButton(copyUrl, e.title)}</span>
      </div>`
    }).join('')

    return `<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <link rel="icon" href="../logo.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="${BOOTSTRAP_SRI}" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../theme.css" />
  </head>
  <body>
    <div class="window">${renderTitlebar()}
      <div class="screen">
        <a class="back" href="../">&larr; zpět na přehled kurzů</a>
        <h1>${escapeHtml(title)}</h1>
        <p class="sub">Přednášky</p>
        <div class="list">${listHtml}
        </div>
      </div>
    </div>
    <footer class="footer">
      <p>&copy; ${year} Adam Fišer | Wanex. Všechna práva vyhrazena.</p>
    </footer>
    <script src="../theme-toggle.js" defer></script>
    <script src="../copy-link.js" defer></script>
  </body>
</html>
`
}

export function renderHubIndexHtml({ courses, year }) {
    const cardsHtml = courses.map(c => `
      <a class="deck-card" href="./${escapeHtml(c.id)}/">
        <span class="name">${escapeHtml(c.title)}</span>
        <span class="count">${c.entryCount} přednášek</span>
      </a>`).join('')

    return `<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Adam Fišer | Přednášky</title>
    <link rel="icon" href="logo.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="${BOOTSTRAP_SRI}" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="theme.css" />
  </head>
  <body>
    <div class="window">${renderTitlebar()}
      <div class="screen">
        <h1>Programování &amp; výuka</h1>
        <p class="sub">Vyberte kurz</p>
        <div class="deck-cards">${cardsHtml}
        </div>
      </div>
    </div>
    <footer class="footer">
      <p>&copy; ${year} Adam Fišer | Wanex. Všechna práva vyhrazena.</p>
    </footer>
    <script src="theme-toggle.js" defer></script>
  </body>
</html>
`
}

export function renderReadmeSection({ course, entries, ghPagesUrl, repoName, computeLiveUrl, width }) {
    const lines = [
        `## ${escapeMdCell(course.title)}`,
        '',
        '| # | Přednáška | PDF |',
        '|---:|-----------|-----|',
        ...entries.map((e, i) => {
            const n = String(i + 1).padStart(width, '0')
            const live = computeLiveUrl(ghPagesUrl, repoName, course.id, e.name)
            const pdf  = `${live}${e.name}.pdf`
            return `| ${n} | [${escapeMdCell(e.title)}](${live}) | [PDF](${pdf}) |`
        }),
    ]
    return lines.join('\n')
}
