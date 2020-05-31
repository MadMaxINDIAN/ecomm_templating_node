const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    title : {
        type: String,
    },
    subtitle : {
        type : String,
    },
    tags : [
        {
            tag : {
                type : String,
            }
        }
    ],
    desc : {
        type : String
    },
    similarProducts : [
        {
            productID : {
                type : String,
            },
        }
    ],
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
                    }
                }
            ],
        }
    ],
    usageInstructions : [
        {
            value : {
                type : String,
            }
        }
    ],
    deliveryInstructions : [
        {
            valus : {
                type : String
            }
        }
    ],
    highlights : [
        {
            title : {
                type : String,
            },
            value : {
                type : String,
            }
        }
    ],
    // TO DO : PRODUCT IMG
    // productImg : [
    //     {
    //         value : {
    //             type : String,
    //         }
    //     }
    // ],
    date : {
        type : String,
        default : Date.now
    },
});

module.exports = User = mongoose.model("Product",ProductSchema);