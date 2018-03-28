import React, { Component } from 'react';

class Wizard extends Component {

  render() {
    return(
      <div className="Wizard">
        <h1>Wizard Page</h1>
        <div className="Wizard-audio">
          <audio className="mainTheme" src="Sounds/dungeon"></audio>
          <audio className="battleTheme" src="Sounds/Epic%20Fantasy%20Music%20-%20Ancient%20Awakening.wav"></audio>
          <audio className="fireBall" src="Sounds/Effects/Weapons/Fireball.wav"></audio>
          <audio className="axeHitFlesh" src="Sounds/Effects/Weapons/AxeHitFlesh"></audio>
          <audio className="usePotion" src="Sounds/Effects/UI/UsePotion.wav"></audio>
        </div>
      </div>
    );
  }
}

export default Wizard;
