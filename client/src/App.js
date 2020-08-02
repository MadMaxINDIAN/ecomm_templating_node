import React from 'react';
import './App.css';
import HomeScreen from "./Screens/HomeScreen";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import ProductScreen from './Screens/ProductScreen';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser,setCurrentAdmin, setCurrentManager} from "./actions/authActions";
import { SET_CURRENT_USER, SET_CURRENT_ADMIN, SET_CURRENT_MANAGER } from './actions/type';
import AdminLogin from './components/auth/adminLogin';
import adminRegister from './components/auth/adminRegister';
import AdminScreen from "./Screens/AdminScreen";
import ManagerLogin from './components/auth/managerLogin';
import ManagerRegister from './components/auth/managerRegister';
import ManagerScreen from "./Screens/ManagerScreen";
import Product from './components/product/product';

// Check for Token
if (localStorage.jwtToken) {
  // Set auth token Header
  setAuthToken(localStorage.jwtToken);
  // Decode Token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthorised
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now()/1000;
  if (currentTime > decoded.exp) {
    // Logout User
    store.dispatch(SET_CURRENT_USER);
    // TODO : CLEAR CART DATA
    // Redirect to login
    window.location.href = "/login";
  }
}

// Check for Admin Token
if (localStorage.adminJwtToken) {
  // Set auth token Header
  setAuthToken(localStorage.adminJwtToken);
  // Decode Token
  const decoded = jwt_decode(localStorage.adminJwtToken);
  // Set user and isAuthorised
  store.dispatch(setCurrentAdmin(decoded))
  // Check for expired token
  const currentTime = Date.now()/1000;
  if (currentTime > decoded.exp) {
    // Logout User
    store.dispatch(SET_CURRENT_ADMIN);
    // TODO : CLEAR CART DATA
    // Redirect to login
    window.location.href = "/admin/login";
  }
}

// Check for Manager Token
if (localStorage.managerJwtToken) {
  // Set auth token Header
  setAuthToken(localStorage.managerJwtToken);
  // Decode Token
  const decoded = jwt_decode(localStorage.managerJwtToken);
  // Set user and isAuthorised
  store.dispatch(setCurrentManager(decoded))
  // Check for expired token
  const currentTime = Date.now()/1000;
  if (currentTime > decoded.exp) {
    // Logout User
    store.dispatch(SET_CURRENT_MANAGER);
    // TODO : CLEAR CART DATA
    // Redirect to login
    window.location.href = "/manager/login";
  }
}


function App() {
  return ( 
        <Provider store = {store}>
        <Router>
        <div className="grid-container">
        <main className="main">
            <div className="content">
                <Route path="/" exact={true} component={HomeScreen} />
                <Route path="/admin/login" exact={true} component={AdminLogin} />
                <Route path="/admin/register" exact={true} component={adminRegister} />
                <Route path="admin/dashboard" exact={true} component={AdminScreen} />
                <Route path="/manager/login" exact={true} component={ManagerLogin} />
                <Route path="/manager/register" exact={true} component={ManagerRegister} />
                <Route path="manager/dashboard" exact={true} component={ManagerScreen} />
                <Route path="/api/product/:productID" component={ProductScreen} />
                <Route path="/product/details/add" component={Product} exact={true}/>
                <Route path="/register" exact={true} component={Register} />
                <Route path="/login" exact={true} component={Login} />        
            </div>
        </main>
        <Footer />
    </div>
    </Router>
    </Provider>
  );
}

export default App;
