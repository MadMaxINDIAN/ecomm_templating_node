import React, { Component } from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdmin } from "./../../actions/authActions";
import Header from "./../Header";
import Sidebar from "./../Sidebar";

class AdminLogin extends Component {
    constructor (){
        super();
        this.state = {
            email : "",
            password : "",
            errors : {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount (){
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/")
        }
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
    onSubmit(e){
        e.preventDefault();
        const User = {
            email : this.state.email,
            password : this.state.password,
        }
        this.props.loginAdmin(User);
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Header />
                <Sidebar />
            <div className="container">
                <div className="form header-margin">
                    <h1 style={{'textAlign' : "center"}}>Login</h1>
                    <h3 style={{'textAlign' : "center"}}>Admin Login</h3>
                    <form onSubmit={this.onSubmit}>
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
                        <br></br>
                        <div className="form-group" ><button className="btn btn-warning btn-block">Submit</button></div>
                        
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

AdminLogin.propTypes = {
    loginAdmin : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth,
    errors : state.errors
})

export default connect(mapStateToProps , {loginAdmin})(AdminLogin)