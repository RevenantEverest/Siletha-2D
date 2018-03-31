import React, { Component } from 'react';

//Audio Imports
import mainTheme from '../../../public/sounds/dungeon';

class Archer extends Component {

  componentDidMount() {
    this.playTheme();
  }

  playTheme() {
    let mainTheme = document.querySelector('.Archer-audio-mainTheme');
    mainTheme.play();
  }

  render() {
    return(
      <div className="Archer">
        <div className="Archer-audio">
          <audio className="Archer-audio-mainTheme" src={mainTheme}></audio>
          <audio className="usePotion" src="Sounds/Effects/UI/UsePotion.wav"></audio>
        </div>
      </div>
    );
  }
}

export default Archer;
