import { SET_PRODUCT_PROGRESS } from "./../actions/type"

const initialState ={progress : 0}

export default function(state = initialState,action){
    switch (action.type){
        case SET_PRODUCT_PROGRESS : 
        return {
            ...state,
            product : action.payload
        }
        default:
            return state;
    }
}