const express = require("express");
const router = express.Router();
const manager_passport = require("passport");
require("./../config/manager-passport");
const mongoose = require("mongoose");

// Validation
const validateProductInput = require("./../validation/product");

// Product Model
const Product = require("./../models/Product");

// @url     POST /api/product/details
// @desc    Add or update product
// @access  Private / Product Manager access only
router.post("/details",manager_passport.authenticate('manager-jwt',{session:false}),(req,res) => {
    req.body.highlights = JSON.parse(req.body.highlights)
    req.body.similarProducts = JSON.parse(req.body.similarProducts)
    req.body.usageInstructions = req.body.usageInstructions.split(",")
    req.body.deliveryInstructions = req.body.deliveryInstructions.split(",")
    console.log(req.body);
    
    // Input validation
    const {errors,isValid} = validateProductInput(req.body);

    if (!isValid){
        return res.status(400).json(errors)
    }

    Product.findOne({productID : req.body.productID})
        .then(product => {
            if (product){
                errors.productID = "Product Id already Exist";
                res.status(400).json(errors)
            }
            else {
                const manager = {
                    email : req.user.email,
                    id : req.user._id
                }
                

                const newProduct = new Product({
                    productID : req.body.productID,
                    title : req.body.title,
                    subtitle : req.body.subtitle,
                    tags : req.body.tags.split(","),
                    desc : req.body.desc,
                    similarProducts : req.body.similarProducts,
                    variations : req.body.variations,
                    usageInstructions : req.body.usageInstructions,
                    deliveryInstructions : req.body.deliveryInstructions,
                    highlights : req.body.highlights,
                    manager : manager,
                    date : req.body.date
                })

                newProduct.save()
                    .then(product => {
                        res.send(product)
                    });
            }
        })
})


// @url     GET /api/product/all
// @desc    Show all the products
// @access  Private / Product Manager access only
router.get("/all",manager_passport.authenticate('manager-jwt',{session:false}),(req,res) => {
    // Initialising ERRORS
    const errors = {}
    
   Product.find({},products => {
       if (products) {
           res.json(products)
       } else {
           errors.noproduct = "There was no product found want to find one."
           res.status(404).json(errors)
       }
   })
})
module.exports = router;