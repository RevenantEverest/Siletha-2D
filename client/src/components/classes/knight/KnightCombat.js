import React, { Component } from 'react';

//Audio Imports
import battleTheme from '../../../public/sounds/EpicFantasyMusic-AncientAwakening.wav';

class KnightCombat extends Component {

  componentDidMount() {
    this.playBattleTheme();
  }

  playBattleTheme() {
    let battleTheme = document.querySelector('.KnightCombat-audio-battle-theme');
    battleTheme.play();
  }

  render() {
    return(
      <div className="KnightCombat">
        <div className="KnightCombat-audio">
          <audio className="KnightCombat-audio-battle-theme" src={battleTheme}></audio>
          <audio className="KnightCombat-audio-sword-hit-plate" src="Sounds/Effects/Weapons/SwordHitPlate"></audio>
          <audio className="KnightCombat-audio-axe-hit-plate" src="Sounds/Effects/Weapons/AxeHitPlate"></audio>
        </div>
      </div>
    );
  }
}

export default KnightCombat;
