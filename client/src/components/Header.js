import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser,logoutAdmin,logoutManager} from "../actions/authActions";

class Header extends Component {

    onLogoutClick (e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.logoutAdmin();
        this.props.logoutManager();
    }

    render() {

    const {isAuthenticated, user} = this.props.auth;

    const authLinks = (
        <div className="collapse navbar-collapse navbars" id="collapse_target1">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-links" onClick={this.onLogoutClick.bind(this)} style={{cursor : "grabbing"}}>
                                <img src="/user.png" style={{width: "40px",marginRight: "20px", borderRadius: "50%"}}/>
                            </a>
                        </li>
                        <br></br>
                        <br />
                        <li className="nav-item">
                            <a className="nav-links" onClick={this.onLogoutClick.bind(this)} style={{cursor : "grabbing",color : "#ff8800",fontSize : "2rem"}}>Logout</a>
                        </li>
                    </ul>
                </div>
    )

    const guestLinks = (
        <div className="collapse navbar-collapse navbars" id="collapse_target1">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{paddingRight : "22px",cursor : "grabbing",color : "#ff8800",fontSize : "2rem"}}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" style={{paddingRight : "22px",cursor : "grabbing",color : "#ff8800",fontSize : "2rem"}}>Sign up</Link>
                        </li>
                    </ul>
                </div>
    )
    
    return (
        <div className="fixed-top">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark py-0">
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
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark py-0">
                {/* SideBar Button */}
                {/* <button onClick={openMenu} NaclassNameName="sidebar-button">&#9776;</button> */}
                <div className="container">
                <Link to="/" className="navbar-brand" style={{fontSize : "1.2rem"}}>program_A_Coder</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target=".navbars">
                        <span className="navbar-toggler-icon"></span>
                </button>
                {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark py-0">
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
    )}
}

Header.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    logoutAdmin : PropTypes.func.isRequired,
    logoutManager : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps, { logoutUser,logoutAdmin ,logoutManager} )(Header);