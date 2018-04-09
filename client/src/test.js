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
      matrixCreated: false,
      playerXYPos: {xpos: 0, ypos: 0},
    }

    let playerXY = {
        xpos: 0,
        ypos: 0,
    };
  }

  componentDidMount() {
    console.log('i was called');
    this.playTheme();
    this.setState({
      myMatrix: new Matrix(5,5)
    }, () => {
      this.createMatrix();
      this.setState({
        matrixCreated: true
      })
    });
  }

  playTheme() {
    let mainTheme = document.querySelector('.Knight-audio-mainTheme');
    mainTheme.play();
  }

  createGrid(int) {
    let result = this.state.myMatrix.content.map((rows , idx)=> {
      return (
        <div className="row-cont" key={idx}>
          {
            this.state.myMatrix.content.map((columns, idxx) => {
            if(this.state.myMatrix.get(idx, idxx) === 1) {
            return (<div className="cellEnemy" key={idxx}>

            </div>)
          } else {
            return (<div className="cellBlank" key={idxx}>

            </div>)
          }}
            )
          }
        </div>
      )
    });
    return result;
  }

  RNG(int){
      let numGen = Math.floor(Math.random() * int);
      return numGen;
  }

  createMatrix() {
    for(let i = 0; i < 5; i++){
        for(let x = 0; x < 5; x++){
            let temp = this.RNG(120);
            if(temp < 20){
                this.state.myMatrix.set(i, x, 1)
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
        <div className="Knight-container">
          {this.state.matrixCreated ? this.createGrid(20) : ''}
          {console.log(this.state.myMatrix)}
        </div>
        <div className="Knight-audio">
          <audio className="Knight-audio-mainTheme" src={mainTheme}></audio>
          <audio className="Knight-audio-usePotion" src={usePotion}></audio>
        </div>
      </div>
    );
  }
}

export default Knight;
