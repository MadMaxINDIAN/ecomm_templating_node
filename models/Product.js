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
    highlights : [
        {
            key : {type : String},
            value : {type : String}
        }
    ],
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
    },
    images : [
        {
            fieldname : {type : String},
            originalname : {type : String},
            encoding : {type : String},
            mimetype : {type : String},
            destination : {type : String},
            filename : {type : String},
            path : {type : String},
            size : {type : Number},
        }
    ]
    
});

module.exports = User = mongoose.model("Product",ProductSchema);