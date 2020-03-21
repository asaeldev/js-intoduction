function printFullName(){
    let name = document.getElementById('name');
    let lastName = document
                    .getElementById('lastName');

    let fullName = name.value + ' ' 
                    + lastName.value;
                    
    document.getElementById('message').innerHTML 
        = fullName;
}

/*
    Multiline comment
*/
function printSubstring(){
    let name = document.getElementById('name');
    let lastName = document
                    .getElementById('lastName');

    // Fresa Banana
    let substr = name.value.substr(5, 
        name.value.toString().length); // Gets substring from a string

    let num = 100 + 20;
    num += 20;
    substr = substr + ' ' + num;

    let enabled = true;
    let person = {
        name: 'Asael',
        lastName: 'Hernández'
    };

    console.log(num, typeof num);
    console.log(substr, typeof substr);
    console.log(enabled, typeof enabled);
    console.log(person, typeof person);

    num += '0';
    if(typeof num == "number"){
        num += 100;
        console.log('New value for num variable = ', num);
    } else {
        num += ' .Im a string';
        console.log('New value for num variable = ', num);
    }
    
    document.getElementById('message').innerHTML 
        = substr;
}

document.getElementById('printFullName')
.addEventListener("click", function(){
    printFullName();
});

document.getElementById('printSubstring')
.addEventListener("click", function(){
    printSubstring();
});