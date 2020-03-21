class Person{
    constructor(name, email = 'example@gmail.com'){
        this.name = name;
        this.email = email;
    }

    getJson(){
        let json = {
            name: this.name,
            email: this.email
        };

        return json;
    }
}

document.getElementById('form')
.addEventListener("submit", function(){
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    
    let person = new Person(name, email);

    console.log(person.getJson());
});

