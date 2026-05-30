const express = require("express");
const app = express(); // ✅ App sabse pehle create karo

const passport = require("passport"); // authentication handling
const FacebookStrategy = require("passport-facebook").Strategy; // teaching passport how to handle Facebook login
const session = require("express-session"); // session yaad rakhega kaun login hai
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path"); // ✅ Missing tha
const config = require("./config"); // ✅ Missing tha
const routes = require("./route.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// har login user ko ek session id milegi
// session = xyz123
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize()); // start the passport
app.use(passport.session()); // passport ko session use karne do


// ===================== SERIALIZE =====================

// this will run only at login time

// Facebook login success
// user profile mila
// serializeUser()

// Example:
// { id:123, displayName:"Aditya" }

// Session me kya save karna hai?
passport.serializeUser(function (user, done) {

  // Demo ke liye poora user save kar rahe ho
  // done(null, user);

  // Real-world me sirf id save karte hain
  done(null, user.id);
});


// ===================== DESERIALIZE =====================

// Ye har request pe chalega

// Session me user.id pada hai
// User.findById(id)

// Output:
// { id:123, name:"Aditya", email:"adi@gmail.com" }

passport.deserializeUser(function (id, done) {

  // Demo version
  done(null, { id });

  // Real-world:
  // const user = await User.findById(id);
  // done(null, user);
});


// ===================== FACEBOOK STRATEGY =====================

// Passport ko sikha rahe hain
// Facebook login kaise handle karna hai

passport.use(
  new FacebookStrategy(
    {
      // Facebook bolta hai:
      // Kaunsi application login karwa rahi hai?
      clientID: config.facebook_api_key,

      // App password
      clientSecret: config.facebook_api_secret,

      // Login ke baad Facebook yahan redirect karega
      callbackURL: config.callback_url,
    },

    // Facebook successful login ke baad
    // ye profile object deta hai
    function (accessToken, refreshToken, profile, done) {

      console.log(profile);

      // Example profile:
      // {
      //   id:"123",
      //   displayName:"Aditya Kumar"
      // }

      return done(null, profile);
    }
  )
);

app.use("/", routes);

const port = 3000;

app.listen(port, () => {
  console.log("App is listening on port " + port);
});