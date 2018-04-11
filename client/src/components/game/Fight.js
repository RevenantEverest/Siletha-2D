import React, { Component } from 'react';

class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {

      // Player States
      playerIdle: '',
      playerAttack: '',
      playerDie: '',
      playerProjectile: '',

      // EnemyStates
      enemyIdle: '',
      enemyAttack: '',
      enemyDie: '',
      enemyProjectile: '',


      character_id: this.props.character_id
    }
  }

  render() {
    return(
      <div className="Fight">

        {/* Health Bars */}
        <div className="Fight-healthBars-container">

          {/* Player Health */}
          <div className="Fight-healthBars-player-healthBar-container">
            <div className="Fight-healthBar-player-healthBar">
            </div>
          </div>

          {/* Enemy Health */}
          <div className="Fight-healthBar-enemy-healthBar-container">
            <div className="Fight-healthBar-enemy-healthBar">
            </div>
          </div>

        </div>
        {/* END */}

        {/* Player Avatar */}
        <div className="Fight-player-avatar-container">
          <div className="Fight-player-avatar">
          </div>
        </div>

        {/* Enemy Avatar */}
        <div className="Fight-enemy-avatar-container">
          <div className="Fight-enemy-avatar">
          </div>
        </div>

        <button onClick={this.props.triggerGame}>Back to Game</button>
      </div>
    );
  }
};

export default Fight;
