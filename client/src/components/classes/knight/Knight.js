import React, { Component } from 'react';

import Matrix from '../../../JavaScript/Matrix';

//Audio Imports
import mainTheme from '../../../public/sounds/dungeon';
import usePotion from '../../../public/sounds/Effects/UI/UsePotion.wav';

class Knight extends Component {

  constructor() {
    super()
    this.state = {
      myMatrix: null,
      playerXYPos: {xpos: 0, ypos: 0},
    }

    let playerXY = {
        xpos: 0,
        ypos: 0,
    };
  }

  componentDidMount() {
    this.playTheme();
    this.createMatrixState();
  }

  playTheme() {
    let mainTheme = document.querySelector('.Knight-audio-mainTheme');
    mainTheme.play();
  }

  createGrid(int) {
    this.state.myMatrix.width.map((el, id) => )
      // change to map for (let rows = 0; rows < int; rows++) {
          //change to map for (let columns = 0; columns < int; columns++) {
              if(this.state.myMatrix.get(rows, columns) === 1){
                  let temp = <div className="grid" id={``+rows+columns+``}></div>;
                  // temp.css("background-color", "red");
                  // document.querySelector(`#Knight-container`).append(temp);
                  // return the elements you want in the React app to render
              }else{
                let something = <div class="grid" id="`+rows+columns+`"></div>
                  // document.querySelector(`#Knight-container`).append(something);
              }
          }
      }

      this.createGridTwo(20);
  }

  createGridTwo(int) {
    document.querySelector(`.grid`).width(760/int);
    document.querySelector(`.grid`).height(760/int);
    document.querySelector(`#` + this.state.playerXYPos.xpos + this.state.playerXYPos.ypos).css("background-color", "blue");
  }

  RNG(int){
      let numGen = Math.floor(Math.random() * int);
      return numGen;
  }

  createMatrixState(){
    let myMatrix = new Matrix(20,20);
    this.setState({
      myMatrix: myMatrix
    }, () => {
      this.createMatrix()
    })
  }

  createMatrix() {
    for(let i = 0; i < this.state.myMatrix.width; i++){
        for(let x = 0; x < this.state.myMatrix.height; x++){
            let temp = this.RNG(500);
            if(temp < 10){
                this.state.myMatrix.set(i, x, 1);
            }else{
                this.state.myMatrix.set(i, x, 0);
            }
            console.log(this.state.myMatrix.get(i, x));
        }
    }
  }



  render() {
    return(
      <div className="Knight">
        <div id="Knight-container">
          {/* {this.createGrid(20)} */}
        </div>
        <div className="Knight-audio">
          <audio className="Knight-audio-mainTheme" src={mainTheme}></audio>
          <audio className="Knight0audio-usePotion" src={usePotion}></audio>
        </div>
      </div>
    );
  }
}

export default Knight;
