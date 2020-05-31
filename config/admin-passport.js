// Admin Authorisation
const JwtStratergy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const keys = require("./key")

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.adminKey;

module.exports = passport => {
    passport.use(
        "admin-jwt",
        new JwtStratergy(opts, (jwt_payload,done) => {
            Admin.findById(jwt_payload.id)
                .then(admin => {
                    if (admin){
                        return done(null,admin);
                    }
                    return  done(null,false);
                })
                .catch(err => console.log(err)
                );
        })
    )
}