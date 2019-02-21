window.onload = function () {

    var suggest = ''
    var dataList = document.querySelector('#suggest')

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

    // Event keypress enter
    text.addEventListener('keypress', keyPress)
    
    function keyPress(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            document.querySelector('#wikiBtn').click()
            text.value = ''
        } else {
            // e.preventDefault()
            text.removeEventListener('keypress', keyPress)
            setTimeout(function() {
                const req = new XMLHttpRequest()
                req.open('GET', 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+e.target.value, false)
                req.send(null)

                if (req.status === 200) {
                    console.log('rep recue : %s', req.status)

                    suggest = JSON.parse(req.response)
                    console.log(suggest[1].length, suggest[1])
                    console.log(dataList.childNodes)
                    for (i=0; i<10; i++) {
                        dataList.childNodes[i+1].value = suggest[1][i]
                    }
                    text.addEventListener('keypress', keyPress)

                } else {
                    console.log('status de la rep: %s (%d)', req.status, req.statusText)
                }
            }, 500)
        }
    }

    // Event search click
    document.querySelector('#wikiBtn').addEventListener('click', function(e) {
        e.preventDefault()
        
        // Transition logo / form up (hide logo)
        document.querySelector('#logo').style.top = '-150px'
        // wikiSearch
        // logo

        // Erase suggestions on enter / click
        for (i=0; i<suggest[1].length; i++) {
            dataList.childNodes[i].value = ''
        }

        // Remove old container / iframe
        if (document.querySelector('#containerWiki')) {

            document.querySelector('#containerWiki').remove()
        }

        const container = document.createElement('div')
        container.setAttribute('class', 'contain')
        container.id = 'containerWiki'
        document.body.appendChild(container)

        const iframe = document.createElement('iframe')
        iframe.id = 'iframe'
        for (i=0; i<10; i++) {
            if (text.value === suggest[1][i]) {
                var src = suggest[3][i]
            }
        }
        iframe.src = src
        container.appendChild(iframe)
    })
}