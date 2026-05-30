const express = require("express");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");

const { OAuth2Client } = require("google-auth-library");

const dotenv = require("dotenv");

const connectDatabase = require("./dbConfig");

const User = require("./models/user");

//setting up the server
dotenv.config();

const app = express();
const hostname='127.0.0.1';
const PORT = 2000;

const client = new OAuth2Client();
const JWT_SECRET = process.env.JWT_SECRET;

// middleware
app.use(express.json());

app.use(cookieParser());


// database connection
connectDatabase();


// route
app.get("/", (req, res) => {

    res.send("Google Auth Server Running");

});

app.post("/google-auth", async (req, res) => {

    const { credential, client_id } = req.body;


    try {

        // verify google token
        const ticket = await client.verifyIdToken({

            idToken: credential,

            audience: client_id

        });


        // extract user data
        const payload = ticket.getPayload();


        const {

            email,

            given_name,

            family_name

        } = payload;


        // check if user exists
        let user = await User.findOne({ email });


        // create user if not exists
        if (!user) {

            user = await User.create({

                email,

                name: `${given_name} ${family_name}`,

                authSource: "google"

            });

        }


        // generate jwt token for keep in mind that the person is logged in
        const token = jwt.sign(

            {

                userId: user._id,

                email: user.email

            },

            JWT_SECRET,

            {

                expiresIn: "1h"

            }

        );


        // send cookie + response
        res
            .status(200)
            .cookie("token", token, {

                httpOnly: true,

                secure: false,

                maxAge: 3600000

            })
            .json({

                message: "Authentication Successful",

                user

            });

    }

    catch(error) {

        console.log(error);

        res.status(400).json({

            message: "Authentication Failed"

        });

    }

});

app.get("/test", async (req, res) => {

    try {

        const user = await User.create({

            email: "test@gmail.com",

            name: "Aditya",

            authSource: "google"

        });

        res.json(user);

    }

    catch(error) {

        console.log(error);

        res.send("Error");

    }

});

app.post("/manual-auth", async (req, res) => {

    try {

        const { email, name } = req.body;

        let user = await User.findOne({ email });

        if (!user) {

            user = await User.create({

                email,
                name,
                authSource: "manual"

            });

        }

        const token = jwt.sign(

            {

                userId: user._id,
                email: user.email

            },

            JWT_SECRET,

            {

                expiresIn: "1h"

            }

        );

        res
            .status(200)
            .cookie("token", token, {

                httpOnly: true,
                secure: false,
                maxAge: 3600000

            })
            .json({

                message: "Manual Authentication Successful",
                token,
                user

            });

    }

    catch(error) {

        console.log(error);

        res.status(400).json({

            message: "Authentication Failed"

        });

    }

});
    

app.listen(PORT,hostname, () => {

    console.log(`Server running on http://${hostname}:${PORT}/`);

});


