const isEmpty = require("./is_empty")

function isArray(value,json) {
    var errors = {}
    if (typeof value === 'object'){
        if (value.length >= json.min && value.length <= json.max){
            errors.value = ""
        } else {
            errors.value = "array length is not in range"
        }
    } else {
        errors.value = "Not an array"
    }
    return (
        !isEmpty(errors.value) && errors.value
    )
}

module.exports = isArray;