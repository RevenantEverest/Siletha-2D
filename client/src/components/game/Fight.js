import React, { Component } from 'react';
import services from '../../services/apiServices';

let playerStates = [
  'Fight-player-avatar-knight-idle',
  'Fight-player-avatar-knight-attack',
  'Fight-player-avatar-knight-die',
  'Fight-player-avatar-knight-projectile'
]
let enemyStates = [
  'Fight-enemy-avatar-idle',
  'Fight-enemy-avatar-attack',
  'Fight-enemy-avatar-die',
  'Fight-enemy-avatar-projectile'
]

class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHealth: this.props.playerHealth,
      enemyHealth: 100,

      playerStates: null,

      playerState: null,
      enemyState: enemyStates[0],

      projectileState: '',

      canAttack: true,

      victory: false,
      defeat: false,

      characterInfo: this.props.characterInfo,
      character_id: this.props.character_id
    }
  }

  componentDidMount() {
    //console.log(this.state.characterInfo);
    if(this.state.characterInfo.class_id == 1) {
      this.setState({
        playerStates: [
          'Fight-player-avatar-knight-idle',
          'Fight-player-avatar-knight-attack',
          'Fight-player-avatar-knight-die',
          'Fight-player-avatar-knight-projectile'
        ]
      }, () => {
        this.setState({
          playerState: this.state.playerStates[0]
        })
      })
    } else if(this.state.characterInfo.class_id == 2) {
      this.setState({
        playerStates: [
          'Fight-player-avatar-wizard-idle',
          'Fight-player-avatar-wizard-attack',
          'Fight-player-avatar-wizard-die',
          'Fight-player-avatar-wizard-projectile'
        ]
      }, () => {
        this.setState({
          playerState: this.state.playerStates[0]
        })
      })
    } else if(this.state.characterInfo.class_id == 3) {
      this.setState({
        playerStates: [
          'Fight-player-avatar-archer-idle',
          'Fight-player-avatar-archer-attack',
          'Fight-player-avatar-archer-die',
          'Fight-player-avatar-archer-projectile'
        ]
      }, () => {
        this.setState({
          playerState: this.state.playerStates[0]
        })
      })
    }
  }

  handleAttackOne() {
    if(this.state.characterInfo.class_id == 1) {
      if(this.state.canAttack) {
        this.setState({
          canAttack: false
        })
        if(this.state.enemyHealth > 0 && this.state.playerHealth > 0) {
          this.setState({
            playerState: this.state.playerStates[1],
            enemyHealth: this.state.enemyHealth -= 50
          })
        }
        setTimeout(() => {
          this.setState({
            playerState: this.state.playerStates[0]
          })
          this.enemy();
        }, 1000)
      }
    } else if(this.state.characterInfo.class_id == 2 || this.state.characterInfo.class_id ==3) {
      if(this.state.canAttack) {
        this.setState({
          canAttack: false
        })
        if(this.state.enemyHealth > 0 && this.state.playerHealth > 0) {
          this.setState({
            playerState: this.state.playerStates[1],
            projectileState: this.state.playerStates[3],
            enemyHealth: this.state.enemyHealth -= 50
          })
        }
        setTimeout(() => {
          this.setState({
            playerState: this.state.playerStates[0],
            projectileState: ''
          })
          this.enemy();
        }, 1000)
      }
    }
  }

  enemy() {
    if(this.state.enemyHealth <= 0) {
      this.setState({
        enemyState: enemyStates[2]
      })
      setTimeout(this.victory(),1000)
    }else {
      if(this.state.enemyHealth > 0 && this.state.playerHealth > 0) {
        this.setState({
          enemyState: enemyStates[1],
          playerHealth: this.state.playerHealth -= 10
        })
      }
      setTimeout(() => {
        this.setState({
          enemyState: enemyStates[0]
        })
        this.canAttack();
      }, 1000)
    }
  }

  canAttack() {
    this.setState({
      canAttack: true
    })
  }

  victory() {
    this.setState({
      victory: true
    })
  }

  itemReward() {
    let num = this.RNG(13)
    let data = {
      character_id: this.state.character_id,
      item_id: num
    }
    console.log(data.item_id);
    services.addItem(data)
    .then(result => {
      console.log('Items Recieved');
      this.grantExperience();
    })
    .catch(err => {
      console.log(err);
    })
  }

  grantExperience() {
    this.setState({
      experience: this.state.characterInfo.experience + 100
    })
    let data = {
      character_id: this.state.character_id,
      exp: this.state.experience
    }
    services.updateCharacterExperience(data)
      .then(result => {
        console.log('Expereience Gained');
      })
      .catch(err => {
        console.log(err);
      })
  }

  RNG(int){
    let numGen = Math.floor(Math.random() * int);
    return numGen;
  }

  render() {
    return(
      <div className="Fight">

        {/* Health Bars */}
        <div className="Fight-healthBars-container">

          {/* Player Health */}
          <div className="Fight-healthBars-player-healthBar-container">
            <div className="Fight-healthBar-player-healthBar">
              <h1>{this.state.playerHealth}</h1>
            </div>
          </div>

          {/* Enemy Health */}
          <div className="Fight-healthBar-enemy-healthBar-container">
            <div className="Fight-healthBar-enemy-healthBar">
              <h1>{this.state.enemyHealth}</h1>
            </div>
          </div>

        </div>
        {/* END */}

        {/* Player Avatar */}
        <div className="Fight-player-avatar-container">
          <div className={`${this.state.playerState}`}>
          </div>
          <div className={`${this.state.projectileState}`}>
          </div>
        </div>

        {/* Enemy Avatar */}
        <div className="Fight-enemy-avatar-container">
          <div className={`${this.state.enemyState}`}>
          </div>
        </div>

        <div className="Fight-player-attacks-container">
          <div className="Fight-player-attacks-contents">
            <button className="Fight-attacks-attackOne" onClick={(e) => this.handleAttackOne()}>AttackOne</button>
          </div>
        </div>
        {this.state.victory ? this.itemReward() : ''}
        {this.state.defeat ? this.renderDefeat() : ''}
        <button className="back-to-game" onClick={this.props.triggerGame}>Back to Game</button>
      </div>
    );
  }
};

export default Fight;
