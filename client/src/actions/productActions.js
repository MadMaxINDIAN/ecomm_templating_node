import {GET_ERRORS , SET_PRODUCT_PROGRESS} from './type';
import axios from "axios";

// Register User
export const addProduct = (productData,history) => dispatch => {
    axios.post("/api/product/details", productData , {
        onUploadProgress : ProgressEvent => {
            let progress = Math.round(ProgressEvent.loaded/ProgressEvent.total*100)
            if (progress < 100) {
                dispatch({
                    type : SET_PRODUCT_PROGRESS,
                    payload : {progress : progress}
                })
            }
        }
    })
    .then(res => 
        {history.push("/manager/dashboard")
        dispatch({
            type : SET_PRODUCT_PROGRESS,
            payload : {...res,progress : 100}
        })
    })
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    )
}