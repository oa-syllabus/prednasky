(function () {
    var root = document.documentElement
    var KEY = 'theme'
    var saved = null
    try { saved = localStorage.getItem(KEY) } catch (e) {}
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved)

    function setActive(choice) {
        var buttons = document.querySelectorAll('[data-theme-choice]')
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle('active', buttons[i].getAttribute('data-theme-choice') === choice)
        }
    }
    setActive(saved || 'auto')

    var buttons = document.querySelectorAll('[data-theme-choice]')
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            var choice = this.getAttribute('data-theme-choice')
            if (choice === 'auto') {
                root.removeAttribute('data-theme')
                try { localStorage.removeItem(KEY) } catch (e) {}
            } else {
                root.setAttribute('data-theme', choice)
                try { localStorage.setItem(KEY, choice) } catch (e) {}
            }
            setActive(choice)
        })
    }
})()
