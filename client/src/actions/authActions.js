import {GET_ERRORS,SET_CURRENT_USER} from './type';
import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { decode } from 'jsonwebtoken';

// Register User
export const registerUser = (userData,history) => dispatch => {
    axios.post("/api/users/register",userData)
    .then(res => history.push("/login"))
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}
// Login - Get user Token
export const loginUser = userData => dispatch => {
    axios.post("/api/users/login",userData)
    .then(res => {
        // Save to LocalStorage
        const { token } = res.data;
        // Set Token to localstorage
        localStorage.setItem("jwtToken",token);
        // Set token to auth header
        setAuthToken(token);
        // Decode Token
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded))
    })
    .catch(err => 
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    );
}

// Set Logged in user
export const setCurrentUser = decoded => {
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    }
}