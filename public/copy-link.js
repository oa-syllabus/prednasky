(function () {
    var RESET_MS = 1600

    function absolute(url) {
        try { return new URL(url, location.href).href } catch (e) { return url }
    }

    function legacyCopy(text) {
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
        return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'))
    }

    function copy(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text) })
        }
        return legacyCopy(text)
    }

    function flash(button, state) {
        button.classList.remove('copied', 'copy-failed')
        button.classList.add(state)
        clearTimeout(button._copyTimer)
        button._copyTimer = setTimeout(function () {
            button.classList.remove(state)
        }, RESET_MS)
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest ? event.target.closest('.copy[data-copy-url]') : null
        if (!button) return

        event.preventDefault()
        var url = absolute(button.getAttribute('data-copy-url'))

        copy(url).then(
            function () { flash(button, 'copied') },
            function () {
                flash(button, 'copy-failed')
                window.prompt('Zkopírujte odkaz ručně:', url)
            },
        )
    })
})()
