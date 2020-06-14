const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    title : {
        type : String
    },
    subtitle : {
        type : String
    },
    description : {
        type : String,
    },
    category : {
        type : String,
    },
    // TODO stock of products
    price : {
        type : Number,
    },
    reviews : [
        {
            rating : {
                type : Number
            },
            desc : {
                type : String,
            },
            date : {
                type : Date
            }
        }
    ],
    // TODO
    // highlights : [
    //     {
    //         key : {
    //             type : String
    //         },
    //         value : {
    //             type : String
    //         }
    //     }
    // ],
    manager : {
        id : {
            type : String,
        },
        name : {
            type : String,
        }
    },
    date : {
        type : Date
    }
    // TODO product image
    
});

module.exports = User = mongoose.model("Product",ProductSchema);