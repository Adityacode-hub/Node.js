const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose=require("mongoose");
const Person = require("myPerson");
const key = require("../setup/myurl");

module.exports = function(passport) {
    const opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = key.secretOrKey;

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await Person.findById(jwt_payload.id);

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        })
    );
};