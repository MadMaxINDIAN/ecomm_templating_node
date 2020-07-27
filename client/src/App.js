import React from 'react';
import './App.css';
import HomeScreen from "./Screens/HomeScreen";
import {BrowserRouter as Router, Route} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./store"
import ProductScreen from './Screens/ProductScreen';
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return ( 
        <Provider store = {store}>
        <Router>
        <div className="grid-container">
        <Header />
        <Sidebar />
        <main className="main">
            <div className="content">
                <Route path="/" exact={true} component={HomeScreen} />
                <Route path="/product/:productID" component={ProductScreen} />
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
