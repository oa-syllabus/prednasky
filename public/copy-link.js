(function () {
    var RESET_MS = 1600

    function absolute(url) {
        try { return new URL(url, location.href).href } catch (e) { return url }
    }

    function legacyCopy(text) {
        var previous = document.activeElement
        var area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.top = '-1000px'
        document.body.appendChild(area)
        area.select()
        var ok = false
        try { ok = document.execCommand('copy') } catch (e) {}
        document.body.removeChild(area)
        // area.select() přebral fokus; bez vrácení by klávesnice začínala od začátku dokumentu.
        if (previous && previous.focus) previous.focus()
        return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'))
    }

    function copy(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Pozor: execCommand z .catch() už neběží v call stacku kliknutí, takže ho
            // Firefox a Safari odmítnou. Tam zbývá ruční cesta ve failed() níže.
            return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text) })
        }
        return legacyCopy(text)
    }

    function flash(button, state, title) {
        button.classList.remove('copied', 'copy-failed')
        button.classList.add(state)
        if (!button._copyTitle) button._copyTitle = button.getAttribute('title') || ''
        button.setAttribute('title', title)
        clearTimeout(button._copyTimer)
        button._copyTimer = setTimeout(function () {
            button.classList.remove(state)
            button.setAttribute('title', button._copyTitle)
        }, RESET_MS)
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest ? event.target.closest('.copy[data-copy-url]') : null
        if (!button) return

        event.preventDefault()
        var url = absolute(button.getAttribute('data-copy-url'))

        copy(url).then(
            function () { flash(button, 'copied', 'Odkaz zkopírován') },
            function () {
                // prompt() může být zablokovaný (iframe, „nezobrazovat další dialogy"),
                // proto chybu vždy nejdřív ohlásíme na samotném tlačítku.
                flash(button, 'copy-failed', 'Kopírování se nepovedlo — odkaz: ' + url)
                window.prompt('Zkopírujte odkaz ručně:', url)
            },
        )
    })
})()
