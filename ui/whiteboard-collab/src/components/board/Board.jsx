import React from 'react';
import './style.css';
class Board extends React.Component{

    constructor(props) {
        super(props);
    }
    render(){
        return(
            <canvas className="board" id="Canvas"></canvas>
            
        )
    }
}

export default Board;