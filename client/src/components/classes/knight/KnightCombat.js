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
        <div className="KnightCombat-health-text">
          <h1>Health</h1>
        </div>
        <div className="KnightCombat-health-bar-container">
            <div className="KnightCombat-health-outline">
                <div className="KnightCombat-health-display"></div>
            </div>
        </div>
        <div className="enemyHealthText"><h1>Enemy Health</h1></div>
        <div className="enemyHealthBarContainer">
            <div className="enemyHealthOutline">
                <div className="enemyHealthDisplay"></div>
            </div>
        </div>
        <div className="main">
          <div className="mainBG">
            <div class="spriteContainer">
                <div class="knightIdle"></div>
                <div class="knight2Idle"></div>
            </div>
            <div class="KnightCombat-winLose">
                <img src="images/transparentPlaceholder.png" class="victory" />
            </div>
              <div class="actionContainer">
                <div class="actionBox">
                    <div class="attacks">
                      <button type="button" class="button attack attackOne" data-increment={10}>Attack One</button>
                      <button type="button" class="button attack attackTwo" data-increment= {20}>Attack Two</button>
                      <button type="button" class="button attack attackThree" data-increment={30}>Attack Three</button>
                      <button type="button" class="button attack attackFour" data-increment={40}>Attack Four</button>
                      <button type="button" class="potions" id="healthPotionButton"><div class="potionContainer"></div></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
            <div className="KnightCombat-audio">
              <audio className="KnightCombat-audio-battle-theme" src={battleTheme}></audio>
              <audio className="KnightCombat-audio-sword-hit-plate" src="Sounds/Effects/Weapons/SwordHitPlate"></audio>
              <audio className="KnightCombat-audio-axe-hit-plate" src="Sounds/Effects/Weapons/AxeHitPlate"></audio>
            </div>
          </div>
    </div>
    );
  }
}

export default KnightCombat;
