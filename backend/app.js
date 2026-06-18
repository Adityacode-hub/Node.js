const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');   

//bring all routes
const auth=require('./routes/api/auth');
const questions=require('./routes/api/questions');
const profile=require('./routes/api/profile');

const passport = require('passport');

const app=express();

//Middleware for the bodyparser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(passport.initialize());
//config for our strategy
require("./strategies/jsonwtStrategy")(passport)
const hostname='127.0.0.1';
const port= process.env.PORT ||5000;

//mogodb configuration

const db=require('./setup/myurl').mongoURL
//connect to the db
mongoose.
connect(db)
.then(()=>console.log('Mongodb connected successfully'))
.catch(err=> console.log(err));

//actual routes i.e middleware it will go to the api route folder as per directed how it will serve

app.use("/api/auth",auth);
app.use("/api/profile",profile);
app.use("/api/questions",questions);

app.get("/",(req,res)=>{
    res.send("hey this is the just a check");
});



app.listen(port,hostname,()=>{
    console.log(`server is running at http://${hostname}:${port}/`);
})




//Aditya@789
//mongodb+srv://testuser:<db_password>@cluster0.fva47mi.mongodb.net/?appName=Cluster0