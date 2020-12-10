import React, { Component } from "react";
import DataService from "../services/service";
import Register from "./login/register";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
const registerButton = {
    background: 'green',
    padding: '1em',
    margin: '1em',
  };
  
  const homeButton = {
    background: 'mediumpurple',
    padding: '1em',
    margin: '1em',
  };
  
  const loginButton = {
    background: 'royalblue',
    padding: '1em',
    margin: '1em',
  };
  
  const inputStyle = {
    margin: '.5em',
  };
  
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };
  
  const title = {
    pageTitle: 'Register Screen',
  };
export default class Registering extends React.Component {
  constructor(props) {
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
    axios.post('http://localhost:5000/api/registering', {
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

  render() {
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
  
      if (messageFromServer === '') {
        return (
          <div>
            <form className="profile-form" onSubmit={this.registerUser}>
              <input
                style={inputStyle}
                id="name"
                label="name"
                value={name}
                onChange={this.handleChange('name')}
                placeholder="Name"
              />
              <input
                style={inputStyle}
                id="email"
                label="email"
                value={email}
                onChange={this.handleChange('email')}
                placeholder="Email"
              />
              <input
                style={inputStyle}
                id="password"
                label="password"
                value={password}
                onChange={this.handleChange('password')}
                placeholder="Password"
                type="password"
              />
              <button
                style={registerButton}
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </button>
            </form>
            
            
          </div>
        );
      }
    }
  } 