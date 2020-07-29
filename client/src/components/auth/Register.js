import React, { Component } from 'react';
import axios from "axios";

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
        console.log(newUser);
        axios.post("/api/users/register",{
            headers: {"Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'},
            params : newUser
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <div className="form">
                    <h1 style={{'marginTop' : "10%"}}>Sign up</h1>
                    <h3>Create your own account to shop</h3>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <input 
                            name="name" 
                            placeholder="name" 
                            className="form-text-input"
                            type="text"
                            value= {this.state.name} 
                            onChange={this.onChange}>
                            </input>
                        </div>
                        <div>
                            <input 
                            name="email" 
                            placeholder="Email" 
                            className="form-text-input"
                            onChange={this.onChange}
                            value = {this.state.email}
                            type="text">
                            </input>
                        </div>
                        <div>
                            <input 
                            name="password" 
                            placeholder="password" 
                            className="form-text-input"
                            onChange={this.onChange}
                            value = {this.state.password}
                            type="text">
                            </input>
                        </div>
                        <div>
                            <input 
                            name="password2" 
                            onChange={this.onChange}
                            type="text"
                            placeholder="confirm password" 
                            value={this.state.password2}
                            className="form-text-input">
                            </input>
                        </div>
                        <br></br>
                        <button className="form-submit-button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register