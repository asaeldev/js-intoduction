var list = ['Im a string'];

list.push(150);
list.push({
    name: 'Asael',
    lastName: 'Hernández'
});

list.push(true);
list.push(150);

let lastElement = list.pop();
console.log('Last element was removed', lastElement);

let firstElement = list.shift();
console.log('First element was shifted', firstElement);

list[0] = 'New element in position 0';

console.log(typeof list);
console.log(list);

function printArray(){
    let html = '<ul>';

    for (let i = 0; i < list.length; i++){
        if(typeof list[i] == 'object'){
            html += '<li>' + JSON.stringify(list[i]) + '</li>';
        }else{
            html += '<li>' + list[i].toString() + '</li>';
        }
    }

    html += '</ul>';

    let elements = document.getElementsByClassName('element');

    if (elements.length > 0){
        elements[0].innerHTML = html;
    }
}

printArray();


