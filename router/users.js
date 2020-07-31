const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
const passport = require("passport");
require("../config/user-passport")(passport)

// Load input validation
const validateRegisterInput = require("./../validation/register")
const validateLoginInput = require("./../validation/login");

// Load User Model
const User = require("./../models/User")

// Admin passport
const admin_passport = require("passport");
require("./../config/admin-passport")(admin_passport);

// @url     Get /api/users/all
// @desc    Gives details of all the user
// @access  Private / Admin access only
router.get("/all",admin_passport.authenticate('admin-jwt',{session:false}),(req,res) => {
    const errors = {}
    User.find({},(err,users) => {
        if (users) {
            res.send(users)
        } else {
            console.log(users);
            
            errors.nouser = "There is no user registered yet."
            res.status(404).json(errors)
        }
    })
})

// @url     POST /api/users/register
// @desc    Create or update user
// @access  Public
router.post("/register",(req,res) => {
    // Input validation
    const {errors,isValid} = validateRegisterInput(req.body);
    
    if (!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email : req.body.email})
        .then(user => {
            if (user) {
                errors.email = 'Email already exist';
                return res.status(400).json(errors)
            } else {
                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password,salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                }))
            }
        })
})

// @route   POST api/users/login
// @desc    Login User / returning token
// @access  Public
router.post("/login",(req,res) => {
    // Input validation
    const {errors,isValid} = validateLoginInput(req.body);

    if (!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email})
        .then(user => {
            if (!user){
                errors.email = 'User not Found';
                return res.status(404).json(errors)
            } else {
                // Check Password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // User Match

                            const payload = {id : user.id,name:user.name,email : user.email}

                            // Sign Token
                            jwt.sign(payload,
                                keys.secretOrKey,
                                {expiresIn : 10000},
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    })
                            })
                        } else {
                            errors.password = "Password incorrect";
                            return res.status(400).json(errors);
                        }
                    })
            }
        })
})

// @route   GET api/users/current
// @desc    Return Current User
// @access  Private
router.get("/current",passport.authenticate('user-jwt',{session:false}),(req,res) => {
    res.json({
        id : req.user.id,
        name : req.user.name,
        email : req.user.email
    })
})

module.exports = router;