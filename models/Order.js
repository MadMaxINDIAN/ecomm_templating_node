const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
    userID : {
        type : String,
    },
    productID : [
        {
            type : String
        }
    ],
    billAmount : {
        type : Number,
    },
    paymentType : {
        type : String
    },
    paymentConfirmed : {
        type : Boolean
    },
    orderConfirmed : {
        type : Boolean,
    },
    orderDelivered : {
        type : Boolean
    },
    date : {
        type : Date
    },
    deliveredOn : {
        type : Date
    },
    cancelled : {
        type : Boolean
    }
});

module.exports = Order = mongoose.model("Order",OrderSchema);