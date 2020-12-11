import React from "react";
import loginImg from "../../white.jpg";
import axios from 'axios';
export class Register extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            name:"",
            email:"",
            password:"",
            role:"",
            submitted: false,
            messageFromServer: '',
            showError: false,
            registerError: false,
            loginError: false,
          };
    }
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
      registerUser = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
          })
          .then(response => {
            console.log(response.data);
            if (response.data === 'username already taken') {
              this.setState({
                showError: true,
                loginError: true,
                registerError: false,
              });
            } else if (response.data === 'username and password required') {
              this.setState({
                showError: true,
                registerError: true,
                loginError: false,
              });
            } else {
              this.setState({
                messageFromServer: response.data,
                showError: false,
                loginError: false,
                registerError: false,
              });
            }
          })
          .catch(error => {
            console.log(error.data);
          });
      };
    

    render(){
        const {
            name,
            email,
            password,
            role,
            messageFromServer,
            showError,
            loginError,
            registerError,
          } = this.state;
        return <div className="base-container" ref={this.props.containerRef}>
             <form onSubmit={this.registerUser}>
            <div className="header">Register As a new user</div>
            <div className="content">
            <div className="image">
                    <img src={loginImg} />
                </div>
               
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id ="name" type="text" label="name" name="name" value={name} onChange={this.handleChange('name')} placeholder="Enter Your name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email ID</label>
                        <input id="email" label="email" value={email} type="text" name="email id" onChange={this.handleChange('email')} placeholder="Enter Your Email ID"/>
                    </div>


                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" label="password" value={password} type="password" name="password" onChange={this.handleChange('password')} placeholder="Enter your password"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <input id="role" label="role" value={role} type="text" name="role" onChange={this.handleChange('role')} placeholder="Enter Your role"/>
                    </div>

                </div>
                
            </div>
            <div className="footer">
                <button type="submit" variant="contained" className="btn">
                    Register
                </button>
            </div>
            </form>
        </div>
    }
}