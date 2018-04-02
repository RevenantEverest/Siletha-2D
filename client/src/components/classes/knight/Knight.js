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
      myMatrix: new Matrix(20,20)
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
        <div className='row-cont' key={idx}>
          {
            this.state.myMatrix.content.map((columns, idxx) => <div className="cell" key={idxx}>X</div>)
          }
        </div>
      )
    });
    return result;
    //     if(this.state.myMatrix.get(rows, columns) === 1) {
    //       return <div className="grid gridEnemy"></div>
    //     }else {
    //       return <div className="grid gridBlank"></div>
    //     }
    //   })
    // })
      // let temp = [];
      // let something = [];
      // for (let rows = 0; rows < int; rows++) {
          // for (let columns = 0; columns < int; columns++) {
              // if(this.state.myMatrix.get(rows, columns) === 1){
                  // temp.push(<div className="grid gridEnemy"></div>)
              // }else{
              //   something.push(<div className="grid gridBlank"></div>)
              // }
          // }
        // temp.forEach(el => {
          // console.log('fuck you => ', el);
          // return el
        // })
        // something.map(el => {se{
              //   s
        //   return el
        // })
      } // end create grid

      // this.createGridTwo(20);

      //document.querySelector(`.grid`).width(760/int);
      //document.querySelector(`.grid`).height(760/int);
      //document.querySelector(`#` + this.state.playerXYPos.xpos + this.state.playerXYPos.ypos).css("background-color", "blue");

  // createGridTwo(int) {
  //   document.querySelector(`.grid`).width(760/int);
  //   document.querySelector(`.grid`).height(760/int);
  //   document.querySelector(`#` + this.state.playerXYPos.xpos + this.state.playerXYPos.ypos).css("background-color", "blue");
  // }

  RNG(int){
      let numGen = Math.floor(Math.random() * int);
      return numGen;
  }

  // createMatrixState(){
  //   this.setState({
  //     myMatrix: new Matrix(20, 20)
  //   }, () => {
  //     // console.log(this.state.myMatrix.content)
  //     this.createMatrix()
  //   })
  // }

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
          {this.state.matrixCreated ? this.createGrid(20) : ''}
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
