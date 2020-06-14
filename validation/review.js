const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateReviewInput(data) {
    let errors ={};

    data.rating = !isEmpty(data.rating) ? data.rating : "";
    data.desc = !isEmpty(data.desc) ? data.desc : "";

    if (validator.isEmpty(data.rating)){
        errors.rating = 'Rating field is required';
    }
    if (validator.isEmpty(data.desc)){
        errors.desc = 'Description field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}