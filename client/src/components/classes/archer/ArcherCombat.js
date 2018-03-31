import React, { Component } from 'react';

//Audio Imports
import battleTheme from '../../../public/sounds/EpicFantasyMusic-AncientAwakening.wav';

class ArcherCombat extends Component {

  componentDidMount() {
    this.playBattleTheme();
  }

  playBattleTheme() {
    let battleTheme = document.querySelector('.ArcherCombat-audio-battle-theme');
    battleTheme.play();
  }

  render() {
    return(
      <div className="ArcherCombat">
        <div className="ArcherCombat-audio">
          <audio className="ArcherCombat-audio-battle-theme" src={battleTheme}></audio>
          <audio className="shootArrow" src="Sounds/Effects/Weapons/ArrowShot"></audio>
          <audio className="axeHitFlesh" src="Sounds/Effects/Weapons/AxeHitFlesh"></audio>
        </div>
      </div>
    );
  }
}

export default ArcherCombat;
