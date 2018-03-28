import React, { Component } from 'react';

class Knight extends Component {

  render() {
    return(
      <div className="Knight">
        <h1>Knight Page</h1>
        <div className="Knight-audio">
          <audio class="mainTheme" src="Sounds/dungeon"></audio>
          <audio class="battleTheme" src="Sounds/Epic%20Fantasy%20Music%20-%20Ancient%20Awakening.wav"></audio>
          <audio class="swordHitPlate" src="Sounds/Effects/Weapons/SwordHitPlate"></audio>
          <audio class="axeHitPlate" src="Sounds/Effects/Weapons/AxeHitPlate"></audio>
          <audio class="usePotion" src="Sounds/Effects/UI/UsePotion.wav"></audio>
        </div>
      </div>
    );
  }
}

export default Knight;
