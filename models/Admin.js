const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
    name : {
        type: String,
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

module.exports = User = mongoose.model("Admin",AdminSchema);