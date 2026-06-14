const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const PersonSchema=new Schema({
    name:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true ,
        unique:true
    },
    password:{
        type:String ,
        required:true
    },
    username:{
        type :String,
    },
    profilepic:{
        type:String,
        deafult:"https://imgs.search.brave.com/_6izdbSVpHbwqbawMBquENAqLf6WtvwCZmTG8AhitpY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdmUtc3VpdGUv/cGhvdG9ncmFwaHkv/Y2hhbmdlLWxvY2F0/aW9uLndlYnA"

    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Person=mongoose.model('myPerson',PersonSchema) ;