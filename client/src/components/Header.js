import React from "react";

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
                    <a href="index.html">  progam_A_Coder</a>
                    {/* <img className="brand-image" src="logo.png" alt="product" /> */}
                </div>
                {/* <div className="header-links">
                    <a href="category1">T shirt</a>
                    <a href="category2">Half sleve Shirt</a>
                    <a href="category3">Full Sleve Shirt</a>
                    <a href="category4">Joggers</a>
                    <a href="category5">Trousers</a>
                </div> */}
                <div className="header-links">
                    <a href="cart">Cart</a>
                    <a href="signin">Sign in</a>
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