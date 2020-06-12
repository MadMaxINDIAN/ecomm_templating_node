const validator = require("validator");
const isEmpty = require("./is_empty");
const isArray = require("./isArray");

module.exports = function validateProductInput(data) {
    let errors ={};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.subtitle = !isEmpty(data.subtitle) ? data.subtitle : "";
    data.desc = !isEmpty(data.desc) ? data.desc : "";
    data.similarProducts = !isEmpty(data.similarProducts) ? data.similarProducts : "";
    data.tags = !isEmpty(data.tags) ? data.tags : "";
    data.highlights = !isEmpty(data.highlights) ? data.highlights : "";
    data.productID = !isEmpty(data.productID) ? data.productID : "";
    
    if (isArray(data.similarProducts.productID,{min : 2,max : 100})){
        errors.similarProducts = isArray(data.similarProducts.productID,{min : 2,max : 100})
    }
    if (isArray(data.highlights.title,{min : 2,max : 100})){
        errors.highlights = isArray(data.highlights.title,{min : 2,max : 100})
    }
    if (!validator.isLength(data.tags, {min:1,max:30})){
        errors.tags = 'Tags must be atleast 1.';
    }
    if (!validator.isLength(data.productID, {min:4,max:12})){
        errors.productID = 'Product ID must be between 4 to 12 characters.';
    }
    if (validator.isEmpty(data.title)){
        errors.title = 'Title field is required';
    }
    if (isEmpty(data.highlights)){
        errors.highlights = 'Highlights field is required';
    }
    if (isEmpty(data.similarProducts)){
        errors.similarProducts = 'Title field is required';
    }
    if (validator.isEmpty(data.productID)){
        errors.productID = 'Product ID is required';
    }
    if (validator.isEmpty(data.subtitle)){
        errors.subtitle = 'Subtitle field is required';
    }
    if (validator.isEmpty(data.desc)){
        errors.desc = 'Description field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}