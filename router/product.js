const express = require("express");
const router = express.Router();
const manager_passport = require("passport");
require("./../config/manager-passport");
const multer = require("multer");
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null , "./client/public/uploads");
    },
    filename : function(req,file,cb){
        cb(null , Date.now() + "__" + file.originalname)
    }
})

const fileFilter = (req,files,cb) => {
    // reject a file
    if (files.mimetype === "image/jpeg" || files.mimetype === "image/pipeg" || files.mimetype === "image/png") {
        cb(null , true);
    } else {
        cb(null ,false);
    }
    
}

const upload = multer({
    storage : storage,
    limits : {
        // Maximum file size of 12MB
        fileSize : 1024*1024*12
    },
    fileFilter : fileFilter

});

// Validation
const validateProductInput = require("./../validation/product");
const validateReviewInput = require("./../validation/review");

// Product Model
const Product = require("./../models/Product");
const product = require("./../validation/product");
const { ObjectId } = require("mongoose");

// @url     POST /api/product/details
// @desc    Add or update product
// @access  Private / Product Manager access only
router.post("/details",manager_passport.authenticate('manager-jwt',{session:false}),upload.array("image",10),(req,res) => {
    console.log(req.body);
    console.log(req.files);
    const {errors,isValid} = validateProductInput(req.body);
    
    const highlights_array = []
    if (typeof req.body.highlights === "string") {
        highlights_array.push( JSON.parse(req.body.highlights) )
    } else {
        for (var i = 0;i < req.body.highlights.length; i++){
            highlights_array.push(JSON.parse(req.body.highlights[i]))
        }
    }
    console.log(highlights_array);
    if (!isValid){
        return res.status(400).json(errors)
    }
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
                    date : Date.now(),
                    images : req.files,
                    highlights : highlights_array
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
// @access  Public
router.get("/all",(req,res) => {
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

// @url     Post /api/product/:productID/review
// @desc    Add a review to the product with the given productID
// @access  Public
router.post("/:productID/review",(req,res) => {
    const productID = req.params.productID
    const {errors,isValid} = validateReviewInput(req.body);

    // console.log(productID);
    
    if (!isValid){
        return res.status(400).json(errors)
    }
    Product.findOne({_id :{$in : [productID]}},(err,product) => {
        if (!product){
            errors.noproduct = "Invalid ProductID"
            res.status(404).json(errors)
        }else {
            const newReview = {
                rating : req.body.rating,
                desc : req.body.desc,
                date : Date.now()
            }
            product.reviews.unshift(newReview)
            const update = product
            Product.findOneAndUpdate({_id : productID},update,{new:true})
                .then(product => res.json(product))
                .catch(err => res.status(400).json(err))
        }
    })
})

// @url     get /api/product/:productID/review
// @desc    get all the review for the given productID
// @access  Public
router.get("/:productID/review",(req,res) => {
    const productID = req.params.productID
    Product.findOne({_id :{$in : [productID]}},(err,product) => {
        if (!product){
            errors.noproduct = "Invalid ProductID"
            res.status(404).json(errors)
        }else {
            res.json(product.reviews)
        }
    })
})

// @url     get /api/product/:productID
// @desc    get product desc for productID
// @access  Public
router.get("/:productID",(req,res) => {
    const productID = req.params.productID
    Product.findOne({_id :{$in : [productID]}},(err,product) => {
        if (!product){
            errors.noproduct = "Invalid ProductID"
            res.status(404).json(errors)
        }else {
            res.json(product)
        }
    })
})

module.exports = router;