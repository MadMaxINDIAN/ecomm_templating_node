const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    productID : {
        type : String
    },
    title : {
        type: String,
    },
    subtitle : {
        type : String,
    },
    tags : [
        {
            type : String
        }
    ],
    desc : {
        type : String
    },
    similarProducts : {
        productID : {
            type : Array
        }
    },
    variations: [
        {
            title : {
                type : String,
            },
            values : [
                {
                    key : {
                        type : String,
                    },
                    value : {
                        type : String,
                    },
                    price : {
                        type : Number,
                    }
                }
            ],
        }
    ],
    usageInstructions : {
        type : Array,
    },
    deliveryInstructions : {
        type : Array,
    },
    highlights : {
        title : {
            type : Array
        },
        value : {
            type : Array
        }
    },
    // TO DO : PRODUCT IMG
    // productImg : [
    //     {
    //         value : {
    //             type : String,
    //         }
    //     }
    // ],
    manager : {
        email : {
            type : String,
        },
        id : {
            type : String,
        }
    },
    date : {
        type : String,
        default : Date.now
    },
});

module.exports = User = mongoose.model("Product",ProductSchema);