// Admin Authorisation
const JwtStratergy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Manager = require("../models/Manager");
const keys = require("./key")

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.managerKey;

module.exports = passport => {
    passport.use(
        "manager-jwt",
        new JwtStratergy(opts, (jwt_payload,done) => {
            Manager.findById(jwt_payload.id)
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