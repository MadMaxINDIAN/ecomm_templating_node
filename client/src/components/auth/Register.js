import React, { Component } from 'react';
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
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
    onChange(e){
        this.setState({ [e.target.name] : e.target.value });
    }
    onSubmit(e){
        e.preventDefault();
        var newUser = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        };
        axios.post("/api/users/register",newUser)
        .then(res => console.log(res.data))
        .catch(err => this.setState({errors : err.response.data}));
}


    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="form">
                    <h1 style={{'textAlign' : "center"}}>Sign up</h1>
                    <h3 style={{'textAlign' : "center"}}>Create your own account to shop</h3>
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
                        <div className="form-group" ><button className="btn btn-warning btn-block">Submit</button></div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default Register