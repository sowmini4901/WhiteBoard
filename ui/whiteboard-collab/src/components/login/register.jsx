import React from "react";
import loginImg from "../../white.jpg";

export class Register extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Register</div>
            <div className="content">
            <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="Enter Your name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email ID</label>
                        <input type="text" name="email id" placeholder="Enter Your Email ID"/>
                    </div>


                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter your password"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <input type="text" name="role" placeholder="Enter Your role"/>
                    </div>

                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Login
                </button>
            </div>
        </div>
    }
}