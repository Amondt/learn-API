const req = new XMLHttpRequest()

req.open('GET', 'https://project-622bb.firebaseio.com/BeCode.json', false)
req.send(null)

if (req.status === 200) {
    console.log('rep recue : %s', req.responseText)
} else {
    console.log('status de la rep: %d (%s)', req.status, req.statusText)
}

console.log(req)
let data = JSON.parse(req.response)
console.log(data)


window.onload = function () {

}