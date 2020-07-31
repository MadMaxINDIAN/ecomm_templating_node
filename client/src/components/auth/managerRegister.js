import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import {registerManager} from "./../../actions/authActions";
import Sidebar from '../Sidebar';
import Header from "./../Header";
import isEmpty from "./../../validation/isEmpty";

class ManagerRegister extends Component {
    constructor (){
        super();
        this.state = {
            name : "",
            email : "",
            password : "",
            password2 : "",
            errors : {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount (){
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors : nextProps.errors})
        }
    }

    isString(value){
        if (typeof value === 'string'){
            return true
        } return false
    }
    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
    onSubmit(e){
        e.preventDefault();
        var newUser = {
            name : this.state.name,
            city : this.state.city,
            experience : this.state.experience,
            address_line1 : this.state.address_line1,
            address_line2 : this.state.address_line2,
            address_line3 : this.state.address_line3,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        };

        this.props.registerManager(newUser,this.props.history)
}


    render() {
        const { errors } = this.state;
        return (
            <div>
                <Header />
                <Sidebar />
            <div className="container">
                <div className="form header-margin">
                    <h1 style={{'textAlign' : "center"}}>Register for new admin</h1>
                    <h3 style={{'textAlign' : "center"}}>You are going to create another admin</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input 
                            name="name" 
                            placeholder="Name" 
                            className={classnames("form-control", {
                                "is-invalid" : errors.name
                            })}
                            type="text"
                            value= {this.state.name} 
                            onChange={this.onChange}>
                            </input>
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                        </div>
                        <div className="form-group">
                            <input 
                            name="city" 
                            placeholder="City" 
                            className={classnames("form-control", {
                                "is-invalid" : errors.city
                            })}
                            type="text"
                            value= {this.state.city} 
                            onChange={this.onChange}>
                            </input>
                        {errors.city && (<div className="invalid-feedback">{errors.city}</div>)}
                        </div>
                        <div className="form-group">
                            <input 
                            name="experience" 
                            placeholder="Experience" 
                            className={classnames("form-control", {
                                "is-invalid" : errors.experience
                            })}
                            type="text"
                            value= {this.state.experience} 
                            onChange={this.onChange}>
                            </input>
                        {errors.experience && (<div className="invalid-feedback">{errors.experience}</div>)}
                        </div>
                        <div className="form-group">
                            <input 
                            name="address_line1" 
                            placeholder="Address line 1" 
                            className={classnames("form-control", {
                                "is-invalid" : errors.address_line1
                            })}
                            type="text"
                            value= {this.state.address_line1} 
                            onChange={this.onChange}>
                            </input>
                        {errors.address_line1 && (<div className="invalid-feedback">{errors.address_line1}</div>)}
                        </div>
                        <div className="form-group">
                            <input 
                            name="address_line2" 
                            placeholder="Address line 2" 
                            className={classnames("form-control", {
                                "is-invalid" : errors.address_line2
                            })}
                            type="text"
                            value= {this.state.address_line2} 
                            onChange={this.onChange}>
                            </input>
                        {errors.address_line2 && (<div className="invalid-feedback">{errors.address_line2}</div>)}
                        </div>
                        <div className="form-group">
                            <input 
                            name="address_line3" 
                            placeholder="Address line 3" 
                            className={classnames("form-control", {
                                "is-invalid" : errors.address_line3
                            })}
                            type="text"
                            value= {this.state.address_line3} 
                            onChange={this.onChange}>
                            </input>
                        {errors.address_line3 && (<div className="invalid-feedback">{errors.address_line3}</div>)}
                        </div>
                        
                        <div className="form-group">
                            <input 
                            name="email" 
                            placeholder="Email" 
                            className={classnames("form-control", {
                                "is-invalid" : errors.email
                            })}
                            onChange={this.onChange}
                            value = {this.state.email}
                            type="text">
                            </input>
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </div>
                        <div className="form-group">
                            <input 
                            name="password" 
                            placeholder="Password" 
                            className={classnames("form-control", {
                                "is-invalid" : errors.password
                            })}
                            onChange={this.onChange}
                            value = {this.state.password}
                            type="password">
                            </input>
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>
                        <div className="form-group">
                            <input 
                            name="password2" 
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm Password" 
                            value={this.state.password2}
                            className={classnames("form-control", {
                                "is-invalid" : errors.password2
                            })}>
                            </input>
                            {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                        </div>
                        <br></br>
                            {errors.unauthorized && <div className="invalid-authorization">{errors.unauthorized}</div>}
                        <div className="form-group" ><button className="btn btn-warning btn-block">Submit</button></div>
                        
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

ManagerRegister.propTypes = {
    registerManager : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    errors : state.errors
})

export default connect(mapStateToProps, {registerManager})(withRouter(ManagerRegister));