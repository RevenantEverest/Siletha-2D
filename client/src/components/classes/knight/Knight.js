import React, { Component } from 'react';

//Audio Imports
import mainTheme from '../../../public/sounds/dungeon';

class Knight extends Component {

  componentDidMount() {
    this.playTheme();
  }

  playTheme() {
    let mainTheme = document.querySelector('.Knight-audio-mainTheme');
    mainTheme.play();
  }

  render() {
    return(
      <div className="Knight">
        <div className="Knight-audio">
          <audio class="Knight-audio-mainTheme" src={mainTheme}></audio>
          <audio class="usePotion" src="Sounds/Effects/UI/UsePotion.wav"></audio>
        </div>
      </div>
    );
  }
}

export default Knight;
