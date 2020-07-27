import React from "react";
import { Link } from "react-router-dom";

function Header(props){
    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
      }
    return (
        <header className="header">
            <div className="header-navbar">
                <div></div>
                <div className="header-links">
                    <a href="contact-us">+91-98765-43210</a>
                    <a href="contact-us">help</a>
                    <a href="offers">offers</a>
                    <a href="partner">Partner with us</a>
                    <a href="track">Track order</a>
                </div>
            </div>
            <div className="header-basic">
                <div className="brand">
                    <button onClick={openMenu} className="sidebar-button">&#9776;</button>
                    <Link to="/">program_A_Coder</Link>
                </div>
                <div className="header-links">
                    <a href="cart">Cart</a>
                    <Link to="register">Sign in</Link>
                </div>
            </div>
            <div className="header-navbar">
                <div></div>
                <div className="header-links">
                    <a href="category-1">category-1</a>
                    <a href="category-2">category-2</a>
                    <a href="category-3">category-3</a>
                    <a href="category-4">category-4</a>
                    <a href="category-5">category-5</a>
                </div>
                <div></div>
            </div>
            
        </header>
        
    )
}

export default Header;