import React from "react";
import loginImg from "../../white.jpg";

export class Login extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div className="base-container" ref={this.props.containerRef}>
            <form action="../container/Container.jsx" method="POST">
            <div className="header">Login</div>
            
            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                
                <div className="form" >
                    <div className="form-group">
                        <label htmlFor="email">Email Id</label>
                        <input type="text" name="email id" placeholder="Enter Your Email ID"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter your password"/>
                    </div>
                </div>
            
            </div>
            <div className="footer">
                <button type="submit" className="btn">
                    Login
                </button>
            </div>
            </form>
        </div>
    }
}