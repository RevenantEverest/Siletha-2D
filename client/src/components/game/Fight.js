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

      enemyDefeated: false,

      itemsRecieved: null,
      itemsRecievedName: null,

      characterInfo: this.props.characterInfo,
      character_id: this.props.character_id
    }
  }

  componentDidMount() {
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
    } else if(this.state.characterInfo.class_id == 2 || this.state.characterInfo.class_id == 3) {
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
        enemyState: enemyStates[2],
        enemyDefeated: true
      })
      setTimeout(() => {
        services.getCharacterInfo(this.state.character_id)
          .then(result => {
            this.setState({
              characterInfo: result.data.data
            }, () => {
              this.itemReward()
            })

          })
          .catch(err => {
            console.log(err);
          })
      }, 1000)
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

  itemReward() {
    let num = this.RNG(13)
    let data = {
      character_id: this.state.character_id,
      item_id: num
    }
    services.addItem(data)
    .then(result => {
      this.setState({
        itemsRecieved: result.data.data,

      })
      this.getItemName()
      this.grantExperience();
    })
    .catch(err => {
      console.log(err);
    })
  }

  grantExperience() {
    console.log('Experienced gined');
    let data = {
      character_id: this.state.character_id,
      exp: 100
    }
    services.updateCharacterExperience(data)
      .then(result => {
        console.log('Expereience Gained');
        this.checkForLevelUp();
        setTimeout(() => {
          this.setState({
            victory: true
          })
        }, 1500)
      })
      .catch(err => {
        console.log(err);
      })
  }

  checkForLevelUp() {
    if(this.state.characterInfo.experience === 300 && this.state.characterInfo.level === 1) {
      console.log("Level 2");
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up');
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 600 && this.state.characterInfo.level === 2) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up');
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 900 && this.state.characterInfo.level === 3) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up');
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 1200 && this.state.characterInfo.level === 4) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up');
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 1500 && this.state.characterInfo.level === 5) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up');
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 1800 && this.state.characterInfo.level === 6) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up')
          this.levelUp()
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 2100 && this.state.characterInfo.level === 7) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up')
          this.levelUp()
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 2400 && this.state.characterInfo.level === 8) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up')
          this.levelUp()
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 2700 && this.state.characterInfo.level === 9) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up')
          this.levelUp()
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 3000 && this.state.characterInfo.level === 10) {
      services.levelUp(this.state.character_id)
        .then(result => {
          console.log('level up')
          this.levelUp()
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  levelUp() {
    this.setState({
      levelUp: true
    })
    setTimeout(() => {
      this.setState({
        levelUp: false
      })
    }, 3000)
  }

  renderLevelUp() {
    console.log("Render Level Up");
    return(
      <div className="LevelUp">
      </div>
    );
  }

  getItemName() {
    services.getItemName(this.state.itemsRecieved.item_id)
      .then(result => {
        this.setState({
          itemsRecievedName: result.data.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderVictory() {
    return(
      <div className="simpleModal-victory">
        <div className="modalContent-victory">
          <h1 className="modalHeading-inventory">Recieved</h1>
          <div className="Fight-victory-container">
            <div className="Fight-victory-contents">
              <h3 className="Fight-victory-contents-expGained">Exp Gained: 100</h3>
              <h3 className="Fight-victory-contents-itemName">{this.state.itemsRecievedName.item_name}</h3>
            </div>
          </div>
          <button className="Fight-continue-button" onClick={this.props.triggerGame}>Continue</button>
        </div>
      </div>
    );
  }

  renderEnemyDefeated() {
    return(
      <div className="Fight-enemy-defeated">
      </div>
    );
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
        {this.state.levelUp ? this.renderLevelUp() : ''}
        {this.state.enemyDefeated && !this.state.levelUp ? this.renderEnemyDefeated() : ''}
        {this.state.victory && !this.state.levelUp ? this.renderVictory() : ''}
        {this.state.defeat ? this.renderDefeat() : ''}
      </div>
    );
  }
};

export default Fight;
