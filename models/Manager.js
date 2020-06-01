const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ManagerSchema = new Schema({
    name : {
        type: String,
        // name = fname + mname + lname
    },
    address_line1 : {
        type: String,
    },
    address_line2 : {
        type: String,
    },
    address_line3 : {
        type: String,
    },
    city : {
        type: String,
    },
    experience : {
        type : Number
        // In months
    },
    education : [
        {
            degree : {
                type : String,
            },
            school : {
                type : String,
            },
            from : {
                type : Date,
            },
            to :{
                type : Date,
            },
            current : {
                type : Boolean,
            },
            desc : {
                type : String,
            }
        }
    ],
    status : {
        type : String,
    },
    email : {
        type: String,
    },
    password : {
        type: String,
    },
    date : {
        type : String,
        default : Date.now
    },
});

module.exports = User = mongoose.model("Manager",ManagerSchema);