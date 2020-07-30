import React, { Component } from 'react'
import classnames from "classnames";
import axios from "axios";

class Login extends Component {
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
    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
    onSubmit(e){
        e.preventDefault();
        const User = {
            email : this.state.email,
            password : this.state.password,
        }
        
        axios.post("/api/users/login",User)
        .then(res => console.log(res.data))
        .catch(err => this.setState({errors : err.response.data}));
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="form">
                    <h1 style={{'textAlign' : "center"}}>Login</h1>
                    <h3 style={{'textAlign' : "center"}}></h3>
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
        )
    }
}

export default Login