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

export function renderCourseIndexHtml({ title, entries, year }) {
    const width = String(entries.length).length
    const listHtml = entries.map((e, i) => {
        const n = String(i + 1).padStart(width, '0')
        return `
      <div class="deck-row">
        <span class="idx">${n}</span>
        <a href="./${escapeHtml(e.name)}">${escapeHtml(e.title)}</a>
        <a class="pdf" href="./${escapeHtml(e.name)}/${escapeHtml(e.name)}.pdf">PDF</a>
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
