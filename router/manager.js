const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../config/key")
const manager_passport = require("passport")
require("../config/manager-passport")(manager_passport)


// Load input validation
const validateRegisterInput = require("../validation/manager_register")
const validateLoginInput = require("../validation/login");

// Load Manager Model
const Manager = require("../models/Manager")

// Load Admin model
const Admin = require("../models/Admin")

// Admin passport
const admin_passport = require("passport");
require("./../config/admin-passport")(admin_passport);

// @url     Get /api/manager/all
// @desc    Gives details of all the manager
// @access  Private / Admin access only
router.get("/all",admin_passport.authenticate('admin-jwt',{session:false}),(req,res) => {
    const errors = {}
    Manager.find({},(err,users) => {
        if (users) {
            res.send(users)
        } else {
            console.log(users);
            
            errors.nouser = "There is no manager registered yet."
            res.status(404).json(errors)
        }
    })
})

// @url     POST /api/manager/register
// @desc    Create a  product manager account by authenticating admin
// @access  Private / Admin
router.post("/register",admin_passport.authenticate('admin-jwt',{session:false}),(req,res) => {
    // Input validation
    const {errors,isValid} = validateRegisterInput(req.body);

    if (!isValid){
        return res.status(400).json(errors)
    }

    Manager.findOne({email : req.body.email})
        .then(user => {
            if (user) {
                errors.email = 'Email already exist';
                return res.status(400).json(errors)
            } else {
                const newManager = new Manager({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    city : req.body.city,
                    address_line1 : req.body.address_line1,
                    address_line2 : req.body.address_line2,
                    address_line3 : req.body.address_line3,
                    experience : req.body.experience
                })

                bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newManager.password,salt, (err,hash) => {
                    if (err) throw err;
                    newManager.password = hash;
                    newManager.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                }))
            }
        })
})

// @route   POST api/manager/login
// @desc    Login Manager / returning token
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
    Manager.findOne({email})
        .then(user => {
            if (!user){
                errors.email = 'Manager not Found';
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
                                keys.managerKey,
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

// @route   GET api/manager/
// @desc    Return Current User
// @access  Private
router.get("/",manager_passport.authenticate('manager-jwt',{session:false}),(req,res) => {
    res.json({
        id : req.user.id,
        name : req.user.name,
        email : req.user.email,
    })
})

module.exports = router;