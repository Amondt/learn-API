window.onload = function () {

    // Event text helper
    var text = document.querySelector('#text')
    var aideText = document.querySelector('#aideText')
    text.addEventListener('focus', function(e) {
        e.preventDefault()
        aideText.textContent = 'enter your search here'
    })
    text.addEventListener('blur', function(e) {
        e.preventDefault()
        aideText.textContent = ''
    })

    // Event search click
    document.querySelector('#wikiBtn').addEventListener('click', function(e) {
        e.preventDefault()

        if (document.querySelector('#containerWiki')) {
            // document.querySelector('#containerWiki').parentNode.removeChild(document.querySelector('#containerWiki'))
            document.querySelector('#containerWiki').remove()
        }

        const container = document.createElement('div')
        container.setAttribute('class', 'container')
        container.id = 'containerWiki'
        document.body.appendChild(container)

        const req = new XMLHttpRequest()
        req.open('GET', 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+text.value, false)
        req.send(null)

        if (req.status === 200) {
            console.log('rep recue : %s', req.status)
            // Start display API request info's
            let data = JSON.parse(req.response)

            for (i=0; i<data[1].length; i++) {
                const part = document.createElement('div')
                part.setAttribute('class', 'promo') // Same css than last API exercice

                const result = document.createElement('h3')
                result.setAttribute('class', 'result')
                result.textContent = data[1][i]

                const description = document.createElement('p')
                description.setAttribute('class', 'description')
                description.textContent = data[2][i]

                const wiki = document.createElement('a')
                wiki.setAttribute('class', 'wiki')
                wiki.textContent = 'wiki'
                wiki.href = data[3][i]

                container.appendChild(part)
                part.appendChild(result)
                part.appendChild(description)
                part.appendChild(wiki)
            }

        } else {
            console.log('status de la rep: %s (%d)', req.status, req.statusText)
        }
    })
}