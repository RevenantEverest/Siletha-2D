import React, { Component } from 'react';

//Audio Imports
import battleTheme from '../../../public/sounds/EpicFantasyMusic-AncientAwakening.wav';

class WizardCombat extends Component {

  componentDidMount() {
    this.playBattleTheme();
  }

  playBattleTheme() {
    let battleTheme = document.querySelector('.WizardCombat-audio-battle-theme');
    battleTheme.play();
  }

  render() {
    return(
      <div className="WizardCombat">
        <div className="WizardCombat-audio">
          <audio className="WizardCombat-audio-battle-theme" src={battleTheme}></audio>
          <audio className="fireBall" src="Sounds/Effects/Weapons/Fireball.wav"></audio>
          <audio className="axeHitFlesh" src="Sounds/Effects/Weapons/AxeHitFlesh"></audio>
        </div>
      </div>
    );
  }
}

export default WizardCombat;
