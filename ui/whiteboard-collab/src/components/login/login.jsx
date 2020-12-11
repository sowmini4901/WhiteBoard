import React from "react";
import loginImg from "../../white.jpg";
import axios from 'axios';
import Container from '../container/Container';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
export class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            showError: false,
          };
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
      loginUser = e => {
        e.preventDefault();
    
        axios
          .get('http://localhost:5000/api/login', {
            params: {
              email: this.state.email,
              password: this.state.password,
            },
          })
          .then(response => {
            if (
              response.data === 'bad email' ||
              response.data === 'passwords do not match'
            ) {
              this.setState({
                showError: true,
              });
            } else {
              localStorage.setItem('jwtToken', response.data.token);
              this.setState({
                loggedIn: true,
                showError: false,
              });
            }
          })
          .catch(error => {
            console.log(error.data);
          });
      };

    render(){
        const { email, password, showError, loggedIn } = this.state;
        return(
            <div>
        <div className="base-container" ref={this.props.containerRef}>
            <form onSubmit={this.loginUser}>
            <div className="header">Login to Whiteboard</div>
            
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                
                <div className="form" >
                    <div className="form-group">
                        <label htmlFor="email">Email Id</label>
                        <input id="email" label="email" value={email} type="text" name="email id" onChange={this.handleChange('email')} placeholder="Enter Your Email ID"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" label="password" value={password} type="password" name="password" onChange={this.handleChange('password')} placeholder="Enter your password"/>
                    </div>
                </div>
            
            </div>
            <div className="footer">
                <button variant="contained" type="submit" className="btn">
                
             <Link to='/whiteboard'>Login </Link> 
                </button>
            </div>
            </form>
        </div>
        </div>
        )
    }
}