const passport = require('passport');
const express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
res.render('pages/index.ejs'); // load the index.ejs file
});

router.get('/profile', isLoggedIn, function (req, res) {
res.render('pages/profile.ejs', {
user: req.user // get the user out of session and pass to template
});
});

router.get('/error', isLoggedIn, function (req, res) {
res.render('page/error.ejs');
});

//user click kiya login with facebook
// auth.facebook
//passport.authenticate()
// facebook login page
//user login

router.get('/auth/facebook', 
passport.authenticate('facebook', {
scope: ['public_profile', 'email']
}));


router.get('/logout', function (req, res) {
req.logout();
res.redirect('/');
});
//this is the middileware it will run first
//agar login pe click kiya aur data authenticate h toh go to the next else redirect to the home page

function isLoggedIn(req, res, next) {
if (req.isAuthenticated())
return next();
res.redirect('/');
}
module.exports = router;