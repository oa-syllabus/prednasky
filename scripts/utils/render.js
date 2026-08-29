export function renderCourseIndexHtml({ title, entries, year }) {
    const linkListHtml = entries.map(e => `
<li class="ibm-plex-mono-thin">
  <a href="./${e.name}" class="ibm-plex-mono-semibold">${e.title}</a>
  <span class="action">(
    <a href="./${e.name}/${e.name}.pdf">PDF</a>
  )</span>
</li>`).join('')

    return `<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="../styles.css" />
    <link rel="icon" href="../logo.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="row margin-top">
        <div>
          <h1>${title}</h1>
          <h2>Přednášky</h2>
          <ol>
            ${linkListHtml}
          </ol>
          <p><a href="../">&larr; Zpět na přehled kurzů</a></p>
        </div>
      </div>
    </div>
    <footer class="footer text-center mt-4">
      <p class="small">&copy; ${year} Adam Fišer | Wanex. Všechna práva vyhrazena.</p>
    </footer>
  </body>
</html>
`
}

export function renderHubIndexHtml({ courses, year }) {
    const linkListHtml = courses.map(c => `
<li class="ibm-plex-mono-thin">
  <a href="./${c.id}/" class="ibm-plex-mono-semibold">${c.title}</a>
  <span class="action">(${c.entryCount} přednášek)</span>
</li>`).join('')

    return `<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Adam Fišer | Přednášky</title>
    <link rel="stylesheet" href="styles.css" />
    <link rel="icon" href="logo.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="row margin-top">
        <div>
          <h1>Programování &amp; výuka</h1>
          <h2>Vyberte kurz</h2>
          <ol>
            ${linkListHtml}
          </ol>
        </div>
      </div>
    </div>
    <footer class="footer text-center mt-4">
      <p class="small">&copy; ${year} Adam Fišer | Wanex. Všechna práva vyhrazena.</p>
    </footer>
  </body>
</html>
`
}

export function renderReadmeSection({ course, entries, ghPagesUrl, repoName, computeLiveUrl }) {
    const width = String(entries.length).length
    const lines = [
        `## ${course.title}`,
        '',
        '| # | Přednáška | PDF |',
        '|---:|-----------|-----|',
        ...entries.map((e, i) => {
            const n = String(i + 1).padStart(width, '0')
            const live = computeLiveUrl(ghPagesUrl, repoName, course.id, e.name)
            const pdf  = `${live}${e.name}.pdf`
            return `| ${n} | [${e.title}](${live}) | [PDF](${pdf}) |`
        }),
    ]
    return lines.join('\n')
}
