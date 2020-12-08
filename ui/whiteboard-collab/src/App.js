import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from './components/container/Container';

import Import from './components/board/import';

import './App.css';
//import Container from './components/container/Container';
import { Login } from "./components/login/index";
import { Register } from "./components/login/index";
/*
function App() {
  return (
    //<Container/>
    <div className="App">
      <Login />
    </div>
  );
}
*/
class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isLogginActive:true,
    }
  }

  changeState(){
    const { isLogginActive } =this.state;
    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render(){
    const{ isLogginActive } = this.state;
    const current=isLogginActive ? "Register" : "Login";
    const currentActive =isLogginActive ? "login" : "register";
    return (
      <div className="Home">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
          {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </div>
         <RightSide 
         current={current} 
         currentActive={currentActive}
         containerRef={ref=>this.rightSide=ref}
          onClick={this.changeState.bind(this)}/>
        </div>
      </div>

    );
  }

}

const RightSide = props => {
  return <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
   <div className="inner-container">
     <div className="text">
       {props.current}
       </div>
   </div>

  </div>
};



function App(){
    return(
        <Router>
            <div className="Routes">
                <Route path="/Home" component={Home}/>
                <Route path="/whiteboard" component={Container}/>
                <Route path="/import" component={Import}/>

            </div>
        </Router>
    )
}
 
export default App;