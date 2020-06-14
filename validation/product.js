const validator = require("validator");
const isEmpty = require("./is_empty");
const isArray = require("./isArray");

module.exports = function validateProductInput(data) {
    let errors ={};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.subtitle = !isEmpty(data.subtitle) ? data.subtitle : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.category = !isEmpty(data.category) ? data.category : "";
    data.price = !isEmpty(data.price) ? data.price : "";
    // TODO
    // data.highlights = !isEmpty(data.highlights) ? data.highlights : "";
    
    if (validator.isEmpty(data.title)){
        errors.title = 'Title is required';
    }
    if (validator.isEmpty(data.subtitle)){
        errors.subtitle = 'Subtitle field is required';
    }
    if (validator.isEmpty(data.description)){
        errors.description = 'Description field is required';
    }
    if (validator.isEmpty(data.category)){
        errors.category = 'Category field is required';
    }
    if (validator.isEmpty(data.price)){
        errors.price = 'Price field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}