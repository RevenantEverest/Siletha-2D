import React, { Component } from 'react';

class Archer extends Component {

  render() {
    return(
      <div className="Archer">
        <h1>Archer Page</h1>
        <div className="Archer-audio">
          <audio className="mainTheme" src="Sounds/dungeon"></audio>
          <audio className="battleTheme" src="Sounds/Epic%20Fantasy%20Music%20-%20Ancient%20Awakening.wav"></audio>
          <audio className="shootArrow" src="Sounds/Effects/Weapons/ArrowShot"></audio>
          <audio className="axeHitFlesh" src="Sounds/Effects/Weapons/AxeHitFlesh"></audio>
          <audio className="usePotion" src="Sounds/Effects/UI/UsePotion.wav"></audio>
        </div>
      </div>
    );
  }
}

export default Archer;
