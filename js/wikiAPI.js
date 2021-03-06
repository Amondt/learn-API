window.onload = function () {

    var suggest = ''
    var dataList = document.querySelector('#suggest')

    var logo = document.querySelector('#logo')

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
                console.log('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+e.target.value)
                req.send(null)

                if (req.status === 200) {
                    console.log('rep recue : %s', req.status)

                    suggest = JSON.parse(req.response)
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
        logo.style.width = '0%'
        logo.style.height = '0%'
        logo.style.margin = '0 auto'
        logo.style.padding = '0'

        // Hide form display
        document.querySelector('#wikiSearch').style.display = 'none'
        document.querySelector('#showSearch').style.display = 'flex'

        // Erase suggestions on enter / click
        for (i=1; i<11; i++) {
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
        var src = suggest[3][0]
        for (i=0; i<10; i++) {
            if (text.value === suggest[1][i]) {
                src = suggest[3][i]
            }
        }
        if(src){
            console.log('test')
            iframe.src = src
            container.appendChild(iframe)
        }else{
            console.log('bonjour')
            container.style.backgroundImage = 'url("../img/404.png")'
            container.style.backgroundSize = 'cover'
            container.style.backgroundRepeat = 'no-repeat'
            container.style.backgroundPosition = '50% 50%'
            container.appendChild(iframe)
        }
        text.value = ''
    })

    // Event show search bar on mouseover new search top bar
    document.querySelector('#showSearch').addEventListener('mouseover', function(e) {
        e.preventDefault()

        document.querySelector('#wikiSearch').style.display = 'flex'
        document.querySelector('#showSearch').style.display = 'none'
    })
}