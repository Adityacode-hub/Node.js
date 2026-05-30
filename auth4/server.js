const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

const hostname = "127.0.0.1";
const port = process.env.PORT || 5000;

app.use(express.json());

const user = {
    id: 1,
    name: "Aditya",
    email: "adi@gmail.com",
    password: "123@123",
    role: "developer"
};

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (email != user.email) {
        return res.send("Wrong Email");
    }

    if (password != user.password) {
        return res.send("Wrong Password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        "mysecretkey",
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Login Successful",
        token
    });
});

const auth = (req, res, next) => {

    const header = req.headers.authorization;
//whether the user has sent the token aur not 
    if (!header) {
        return res.send("No Token");
    }
    //Bearer eyJhbGc...
//first it will split then it will take out the token
    const token = header.split(" ")[1];
    //Bearer
    //eyJhbGc -->this is token

    try {

        const decoded = jwt.verify(token, "mysecretkey");

        req.user = decoded;

        next();

    } catch (err) {

        res.send("Invalid Token");
    }
};

app.get("/profile", auth, (req, res) => {
    res.json(req.user);
});
app.get("/profile", auth, (req, res) => {
    res.json(req.user);
});

app.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}/`);
});