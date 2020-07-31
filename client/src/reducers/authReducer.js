import { SET_CURRENT_USER, SET_CURRENT_ADMIN, SET_CURRENT_MANAGER } from "./../actions/type";
import isEmpty from "./../validation/isEmpty"
import { StaticRouter } from "react-router-dom";

const initialState ={
    isAuthenticated :false,
    user : {},
    admin : {},
    manager : {}
}

export default function(state = initialState,action){
    switch (action.type){
        case SET_CURRENT_USER :
        return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user : action.payload
        }
        case SET_CURRENT_ADMIN : 
        return {
            ...state,
            isAuthenticated : !isEmpty(action.payload),
            admin : action.payload
        }
        case SET_CURRENT_MANAGER : 
        return {
            ...state,
            isAuthenticated : !isEmpty(action.payload),
            manager : action.payload
        }
        default:
            return state;
    }
}