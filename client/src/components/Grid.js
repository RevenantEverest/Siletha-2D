import React, { Component } from 'react';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      grid: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      playerXYPos: {xpos: 0, ypos: 0}
    }
  }

  createGrid() {
    let result = this.state.grid.map((rows, idx) => {
      return (
        <div className="row-cont" key={idx}>
          {
            this.state.grid.map((columns, idxx) => {
              return <div className="cellBlank" key={idxx}></div>
            })
          }
        </div>
      )
    })
    return result;
  }



  render() {
    return(
      <div className="Grid">
        {this.createGrid()}
      </div>
    );
  }

}

export default Grid;
