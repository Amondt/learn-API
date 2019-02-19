const req = new XMLHttpRequest()

req.open('GET', 'https://project-622bb.firebaseio.com/BeCode.json', false)
req.send(null)

if (req.status === 200) {
    // console.log('rep recue : %s', req.responseText)
    console.log('rep recue : %s', req.status)
} else {
    console.log('status de la rep: %d (%s)', req.status, req.statusText)
}

console.log(req)
let data = JSON.parse(req.response)


window.onload = function () {
    const app = document.querySelector('main')
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    const h1 = document.createElement('h1')
    h1.textContent = 'BeCode promo\'s'

    app.appendChild(h1)
    app.appendChild(container)

    for (i=0; i<data.length; i++) {
        const promo = document.createElement('div')
        promo.setAttribute('class', 'promo')

        const firstName = document.createElement('h3')
        firstName.setAttribute('class', 'firstName')
        firstName.textContent = data[i].profile.firstname
        const lastName = document.createElement('h3')
        lastName.setAttribute('class', 'lastName')
        lastName.textContent = data[i].profile.lastname

        const image = document.createElement('img')
        image.setAttribute('width', '200px')
        image.setAttribute('src', data[i].image)

        const history = document.createElement('p')
        history.setAttribute('class', 'history')
        history.textContent = data[i].history

        const wiki = document.createElement('a')
        wiki.setAttribute('class', 'wiki')
        wiki.setAttribute('href', data[i].wiki)
        wiki.textContent = 'wiki'

        container.appendChild(promo)

        promo.appendChild(firstName)
        promo.appendChild(lastName)
        promo.appendChild(image)
        promo.appendChild(history)
        promo.appendChild(wiki)
    }
}