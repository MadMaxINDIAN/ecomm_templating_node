import React from "react";
import { Link } from "react-router-dom";

function Header(props){
    // const openMenu = () => {
    //     document.querySelector(".sidebar").classList.add("open");
    //   }
    return (
        <div className="fixed-top">
            <nav className="navbar navbar-expand-sm navbar-light bg-light py-0">
                <div className="collapse navbar-collapse navbars" id="collapse_target2">
                    <ul className="navbar-nav ml-auto" style={{fontSize : "0.8rem",padding : "0px"}}>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>+91-98765-43210</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Help</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Offers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Partner With Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Track Order</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className="navbar navbar-expand-sm navbar-light bg-light py-0">
                {/* SideBar Button */}
                {/* <button onClick={openMenu} NaclassNameName="sidebar-button">&#9776;</button> */}
                <div className="container">
                <Link to="/" className="navbar-brand" style={{fontSize : "1.2rem"}}>program_A_Coder</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target=".navbars">
                        <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbars" id="collapse_target1">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{paddingRight : "22px"}}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" style={{paddingRight : "22px"}}>Sign up</Link>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-sm navbar-light bg-light py-0">
                <div className="collapse navbar-collapse navbars" id="collapse_target2">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Category 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Category 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Category 3</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Category 4</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" style={{paddingRight : "22px"}}>Category 5</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;