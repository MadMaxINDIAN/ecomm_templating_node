const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateOrderInput(data) {
    let errors ={};

    data.billAmount = !isEmpty(data.billAmount) ? data.billAmount : "";
    data.paymentType = !isEmpty(data.paymentType) ? data.paymentType : "";
    data.paymentConfirmed = !isEmpty(data.paymentConfirmed) ? data.paymentConfirmed : "";
    data.productID = !isEmpty(data.productID) ? data.productID : "";

    if (validator.isEmpty(data.billAmount)){
        errors.billAmount = 'Bill amount is required';
    }
    if (validator.isEmpty(data.paymentType)){
        errors.paymentType = 'Payment Type field is required';
    }
    if (validator.isEmpty(data.paymentConfirmed)){
        errors.paymentConfirmed = 'Payment Confirmed field is required';
    }
    if (validator.isEmpty(data.productID)){
        errors.productID = 'ProductId field is required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}