const express = require("express");
const router = express.Router();
const manager_passport = require("passport");
require("./../config/manager-passport");
const mongoose = require("mongoose");

// Validation
const validateProductInput = require("./../validation/product");

// Product Model
const Product = require("./../models/Product");
const product = require("./../validation/product");

// @url     POST /api/product/details
// @desc    Add or update product
// @access  Private / Product Manager access only
router.post("/details",manager_passport.authenticate('manager-jwt',{session:false}),(req,res) => {
    const {errors,isValid} = validateProductInput(req.body);

    if (!isValid){
        return res.status(400).json(errors)
    }

    console.log(req.body);
    
    
    Product.findOne({title : req.body.title})
        .then(product => {
            if (product) {
                errors.email = 'Product with same title already exist';
                return res.status(400).json(errors)
            } else {
                const manager ={
                    id : req.user._id,
                    name : req.user.name
                }
                const newProduct = new Product({
                    manager : manager,
                    title : req.body.title,
                    subtitle : req.body.subtitle,
                    description : req.body.description,
                    category : req.body.category,
                    price : req.body.price,
                    // TODO
                    // highlights : req.body.highlights
                })

                newProduct.save()
                    .then(product => {
                        res.json(product)
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    })
                
            }
        })
})


// @url     GET /api/product/all
// @desc    Show all the products
// @access  Private / Product Manager access only
router.get("/all",manager_passport.authenticate('manager-jwt',{session:false}),(req,res) => {
    // Initialising ERRORS
    const errors = {}
    
   Product.find({},(err,products) => {
       if (products) {
           res.json(products)
       } else {
           errors.noproduct = "There was no product found want to find one."
           res.status(404).json(errors)
       }
   })
})

module.exports = router;