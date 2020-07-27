import React, { Component } from 'react'

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
        console.log(User);
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
                            name="email" 
                            placeholder="Email" 
                            className="form-text-input"
                            required
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
                            required
                            onChange={this.onChange}
                            value = {this.state.password}
                            type="text">
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

export default Login