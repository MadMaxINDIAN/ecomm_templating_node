const express = require("express");
const router = express.Router();

// User passport
const user_passport = require("passport")
require("../config/user-passport")(user_passport)

// Admin passport
const admin_passport = require("passport");
require("./../config/admin-passport")(admin_passport);

// User Model
const User = require("./../models/User");

// Product Model
const Product = require("./../models/Product");

// Order Model
const Order = require("../models/Order");

// Validation
const validateOrderInput = require("./../validation/order");

// @url     Post /api/order/place/:userID/
// @desc    Place an order for list of productIDs
// @access  Private // Access only after user login
router.post("/place",user_passport.authenticate('user-jwt',{session:false}),(req,res) => {
    // Input Validation
    const {errors,isValid} = validateOrderInput(req.body);

    if (!isValid){
        return res.status(400).json(errors)
    }
    req.body.productID = req.body.productID.split(",")
    const {productID,billAmount,paymentType,paymentConfirmed} = req.body
    const noOfProduct = productID.length
    const userId = req.user._id
    User.findOne({_id :{$in : [userId]}})
        .then(user => {
            if (!User){
                errors.nouser = "Invalid UserID"
                res.status(400).json(errors)
            } else {
                Product.find({_id :{$in : [productID]}})
                    .then(products => {
                        if (products.length === noOfProduct) {
                            const newOrder = Order({
                                userID : userId,
                                productID : productID,
                                billAmount : billAmount,
                                paymentType : paymentType,
                                paymentConfirmed : paymentConfirmed,
                                orderConfirmed : false,
                                orderDelivered : false,
                                date : Date.now(),
                                cancelled : false
                            })
                            
                            newOrder.save()
                                .then(order => res.json(order))
                                .catch(err => res.status(400).json(err))

                        } else {
                            errors.product = "One of the product in the cart do not exist"
                            res.status(400).json(errors)
                        }
                    })
                    .catch(err => {res.status(400).json(err)})
            }
        })
        .catch(err => res.status(400).json(err))
})

// @url     Get /api/order/:orderID
// @desc    Get Order details using order ID
// @access  Public
router.get("/user/:userID",user_passport.authenticate('user-jwt',{session:false}),(req,res) => {
    const errors = {}
    const userID = req.params.userID
    Order.find({userID :{$in : [userID]}})
        .then((order) => {
            if (!order) {
                errors.noorder = "There is no order for the given user"
                res.status(400).json(errors)
            } else {
                res.json(order)
            }
        })
        .catch(err => res.status(400).json(err))
})

// @url     Get /api/order/:orderID
// @desc    Get Order details using order ID
// @access  Public
router.get("/:orderID",(req,res) => {
    const errors = {}
    Order.findOne({_id :{$in : [req.params.orderID]}})
        .then(order => {
            if (!order) {
                errors.noorder = "There is no order for the given orderID"
                res.status(400).json(errors)
            } else {
                res.json(order)
            }
        })
        .catch(err => res.status(400).json(err))
})

// @url     Get /api/order/all
// @desc    Get Order details for all order
// @access  Private / Admin access only
router.get("/all",admin_passport.authenticate('admin-jwt',{session:false}),(req,res) => {
    Order.find({},(err,order) => {
        if (!order) {
            errors.noorder = "There is no order yet"
            res.status(400).json(errors)
        } else {
            res.json(order)
        }
    })
})

module.exports = router;