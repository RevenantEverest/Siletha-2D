import React, { Component } from 'react';

//Audio Imports
import mainTheme from '../../../public/sounds/dungeon';

class Wizard extends Component {

  componentDidMount() {
    this.playTheme();
  }

  playTheme() {
    let mainTheme = document.querySelector('.Wizard-audio-mainTheme');
    mainTheme.play();
  }

  render() {
    return(
      <div className="Wizard">
        <div className="Wizard-audio">
          <audio className="Wizard-audio-mainTheme" src={mainTheme}></audio>

          <audio className="usePotion" src="Sounds/Effects/UI/UsePotion.wav"></audio>
        </div>
      </div>
    );
  }
}

export default Wizard;
