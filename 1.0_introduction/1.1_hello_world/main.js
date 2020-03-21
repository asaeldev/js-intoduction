let s1 = 'Hello World from HTML page!';

let element = document.getElementById('message');
element.innerHTML = s1;

console.log(s1);

function printWelcomeMessage() {
    let name = document.getElementById('name').value;

    let message = 'Hello <strong>' + name + '</strong>';
    document.getElementById('welcomeMessage').innerText = message;
}