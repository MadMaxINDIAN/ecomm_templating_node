import React, { Component } from "react";
import data from "./../data";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import Banner from "./../components/Banner";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

class ManagerScreen extends Component{
    render () {
    return (
        <div className="admin">
            <Header />
            <Sidebar />
        </div>
    )}
}

ManagerScreen.propTypes = {
    auth : PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
    auth : state.auth
})

export default connect(mapStatetoProps)(ManagerScreen);