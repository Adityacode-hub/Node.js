const express = require("express");

const session = require("express-session");

const app = express();

const hostname = "127.0.0.1";

const port = process.env.PORT || 5000;


// Built-in body parser middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Session middleware
app.use(session({

    secret: "mysecret123",

    resave: false,

    saveUninitialized: false,

    cookie: {

        secure: false, // true only in HTTPS production

        maxAge: 24 * 60 * 60 * 1000 // 24 hours

    }

}));


// Sample user database
const users = [

    {
        id: 1,
        username: "user1",
        password: "password1"
    }

];


// Home Route
app.get("/", (req, res) => {

    res.send(`

        <h1>Home Page</h1>

        <a href="/login">Go To Login</a>

    `);

});


// Login Page
app.get("/login", (req, res) => {

    res.send(`

        <h1>Login Page</h1>

        <form action="/login" method="POST">

            <input 
                type="text" 
                name="username" 
                placeholder="Enter Username"
            />

            <br><br>

            <input 
                type="password" 
                name="password" 
                placeholder="Enter Password"
            />

            <br><br>

            <button type="submit">

                Login

            </button>

        </form>

    `);

});


// Login Route
app.post("/login", (req, res) => {

    const { username, password } = req.body;


    // Find User
    const user = users.find(

        u => u.username === username &&
             u.password === password

    );


    // Invalid User
    if (!user) {

        return res.status(401).send("Invalid Credentials");

    }


    // Store session
    req.session.user = {

        id: user.id,

        username: user.username

    };


    res.send(`

        <h1>Login Successful</h1>

        <a href="/profile">Go To Profile</a>

    `);

});


// Protected Profile Route
app.get("/profile", (req, res) => {


    // Check Login
    if (!req.session.user) {

        return res.status(401).send("Unauthorized");

    }


    res.send(`

        <h1>Profile Page</h1>

        <h2>Welcome ${req.session.user.username}</h2>

        <form action="/logout" method="POST">

            <button type="submit">

                Logout

            </button>

        </form>

    `);

});


// Logout Route
app.post("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {

            return res.status(500).send("Logout Failed");

        }

        res.send("Logout Successful");

    });

});


// Start Server
app.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);

});