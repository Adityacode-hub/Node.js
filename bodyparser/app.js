const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const hostname = "127.0.0.1";
const port = 5000;


//body parser is the specific type of body parser used to request body

// Import all parsers
//const bodyParser = require('body-parser');

// Or import individual parsers directly
const json = require('body-parser/json');
const urlencoded = require('body-parser/urlencoded');
const raw = require('body-parser/raw');
const text = require('body-parser/text');



// Body Parser Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// Custom Middleware
app.use((req, res, next) => {

    console.log("I am custom middleware");

    next();

});


// Home Route
app.get("/", (req, res) => {

    res.send("Home Page");

});


// POST Route
// Login Page Route

app.get("/login", (req, res) => {

    res.send(`

        <h1>Login Page</h1>

        <form method="POST" action="/login">

            <input type="text" name="username" placeholder="Enter Username"/>

            <br><br>

            <input type="password" name="password" placeholder="Enter Password"/>

            <br><br>

            <button type="submit">Login</button>

        </form>

    `);

});

// Handle Login Form
app.post("/login", (req, res) => {
//this will give the body i.e username and the password
    console.log(req.body);

    const username = req.body.username;

    const password = req.body.password;

    res.send(`Welcome ${username}`);

});

// Start Server
app.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);

});