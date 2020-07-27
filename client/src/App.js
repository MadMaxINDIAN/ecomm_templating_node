import React from 'react';
import './App.css';
import HomeScreen from "./Screens/HomeScreen";
import {BrowserRouter, Route} from "react-router-dom"
import ProductScreen from './Screens/ProductScreen';
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"

function App() {
  return ( 
        <BrowserRouter>
    <div className="grid-container">
        <Header />
        <Sidebar />
        <main className="main">
            <div className="content">
                <Route path="/" exact={true} component={HomeScreen} />
                <Route path="/index.html" exact={true} component={HomeScreen} ></Route>
                <Route path="/product/:productID" component={ProductScreen} />         
            </div>
        </main>
        <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
