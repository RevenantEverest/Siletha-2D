import React, { Component } from 'react';
import services from '../../services/apiServices';

import Inventory from './Inventory';

//Audio Imports
import BattleTheme from '../../public/sounds/EpicFantasyMusic-AncientAwakening.wav';
import KnightAttack from '../../public/sounds/Effects/Weapons/SwordHitPlate';
import WizardAttack from '../../public/sounds/Effects/Weapons/Fireball.wav';
import WizardAttack2 from '../../public/sounds/Effects/Weapons/ShadowBall.mp3';
import ArcherAttack from '../../public/sounds/Effects/Weapons/ArrowShot';

import EnemyAttack from '../../public/sounds/Effects/Weapons/AxeHitFlesh';

import InventoryOpen from '../../public/sounds/Effects/UI/cloth1.ogg';
import InventoryClose from '../../public/sounds/Effects/UI/cloth2.ogg';
import LevelUp from '../../public/sounds/Effects/UI/LevelUp.mp3';

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

      itemsNameRecieved: false,

      characterInfo: this.props.characterInfo,
      character_id: this.props.character_id
    }
  }

  componentDidMount() {
    services.getCharacterInfo(this.state.character_id)
      .then(result => {
        this.setState({
          characterInfo: result.data.data
        })
        if(result.data.data.health <= 0) {
          this.setState({
            playerState: this.state.playerStates[2],
            defeat: true
          })
        }
      })
      .catch(err => {
        console.log(err);
      })

    if(this.state.enemyHealth <- 0) {
      this.setState({
        enemyHealth: 0
      })
    }

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
          'Fight-player-avatar-wizard-projectile',
          'Fight-player-avatar-wizard-projectile2'
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
          'Fight-player-avatar-archer-projectile',
          'Fight-player-avatar-archer-projectile2'
        ]
      }, () => {
        this.setState({
          playerState: this.state.playerStates[0]
        })
      })
    }

    this.playBattleTheme();
  }

  playBattleTheme() {
    let theme = document.querySelector('.BattleTheme');
    theme.play();
  }

  stopBattleTheme() {
    let theme = document.querySelector('.BattleTheme');
    theme.pause();
  }

  handleAttackOne() {
    if(this.state.characterInfo.class_id == 1) {
      if(this.state.canAttack) {
        this.setState({
          canAttack: false
        })
        if(this.state.enemyHealth > 0 && this.state.characterInfo.health > 0) {
          this.setState({
            playerState: this.state.playerStates[1],
            enemyHealth: this.state.enemyHealth -= this.RNG(40) //Attack one damage output if Knight
          })
        }
        this.playKnightAttack();
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
        if(this.state.enemyHealth > 0 && this.state.characterInfo.health > 0) {
          this.setState({
            playerState: this.state.playerStates[1],
            projectileState: this.state.playerStates[3],
            enemyHealth: this.state.enemyHealth -= this.RNG(40) //Attack One damage output if Wizard or Archer
          })
          if(this.state.characterInfo.class_id == 2) {
            this.playWizardAttack();
          }else if(this.state.characterInfo.class_id == 3) {
            this.playArcherAttack();
          }
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

  handleAttackTwo() {
    if(this.state.characterInfo.class_id == 1) {
      if(this.state.canAttack) {
        this.setState({
          canAttack: false
        })
        if(this.state.enemyHealth > 0 && this.state.characterInfo.health > 0) {
          this.setState({
            playerState: this.state.playerStates[1],
            enemyHealth: this.state.enemyHealth -= this.RNG(40) //Attack two damage output if Knight
          }, () => {
            setTimeout(() => {
              this.setState({
                playerState: this.state.playerStates[0]
              })
              this.enemy();
            }, 1000)
          })
        }
        this.playKnightAttack();

      }
    } else if(this.state.characterInfo.class_id == 2 || this.state.characterInfo.class_id == 3) {
      if(this.state.canAttack) {
        this.setState({
          canAttack: false
        })
        if(this.state.enemyHealth > 0 && this.state.characterInfo.health > 0) {
          this.setState({
            playerState: this.state.playerStates[1],
            projectileState: this.state.playerStates[4],
            enemyHealth: this.state.enemyHealth -= this.RNG(40) //Attack two damage output if Wizard or Archer
          }, () => {
            setTimeout(() => {
              this.setState({
                playerState: this.state.playerStates[0],
                projectileState: ''
              })
              this.enemy();
            }, 1000)
          })
          if(this.state.characterInfo.class_id == 2) {
            this.playWizardAttack2();
          }else if(this.state.characterInfo.class_id == 3) {
            this.playArcherAttack();
          }
        }

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
              this.itemReward();
              this.checkForQuest();
            })

          })
          .catch(err => {
            console.log(err);
          })
      }, 1000)
    }else if(this.state.enemyHealth > 0) {
      if(this.state.enemyHealth > 0 && this.state.characterInfo.health > 0) {
        this.setState({
          enemyState: enemyStates[1],
          damage: this.RNG(20)
        }, () => {
          this.playerTakeDamage()
        })
        this.playEnemyAttack();
      }

      setTimeout(() => {
        this.setState({
          enemyState: enemyStates[0]
        })
        this.canAttack();
      }, 1000)
    }
  }

  playerTakeDamage() {
    let data = {
      character_id: this.state.character_id,
      damage: this.state.damage
    }
    console.log("Player takes damage", this.state.damage);
    services.playerTakeDamage(data)
      .then(result => {
        console.log(result);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      })
  }

  canAttack() {
    this.setState({
      canAttack: true
    })
  }

  itemReward() {
    let num = this.RNG(26)
    let data = {
      character_id: this.state.character_id,
      item_id: num
    }
    services.addItem(data)
    .then(result => {
      this.setState({
        itemsRecieved: result.data.data,

      })
      this.grantGold();
      this.grantExperience();
    })
    .catch(err => {
      console.log(err);
    })
  }

  grantExperience() {
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

  grantGold() {
    let data = {
      gold: 25,
      character_id: this.state.character_id
    }
    services.getGold(data)
      .then(results => {
        console.log("Gold recieved");
        this.getItemName()
      })
      .catch(err => {
        console.log(err);
      })
  }

  checkForLevelUp() {
    let data = {
      character_id: this.state.character_id,
      health: 100
    }

    if(this.state.characterInfo.experience === 300 && this.state.characterInfo.level === 1) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 600 && this.state.characterInfo.level === 2) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 900 && this.state.characterInfo.level === 3) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 1200 && this.state.characterInfo.level === 4) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 1500 && this.state.characterInfo.level === 5) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 1800 && this.state.characterInfo.level === 6) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 2100 && this.state.characterInfo.level === 7) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 2400 && this.state.characterInfo.level === 8) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 2700 && this.state.characterInfo.level === 9) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
        })
        .catch(err => {
          console.log(err);
        })
    }else if(this.state.characterInfo.experience === 3000 && this.state.characterInfo.level === 10) {
      services.levelUp(this.state.character_id)
        .then(result => {
          services.useItem(data)
            .then(result => {

            })
            .catch(err => {
              console.log(err);
            })
          this.levelUp();
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
    this.playLevelUp();
    setTimeout(() => {
      this.setState({
        levelUp: false
      })
    }, 3000)
  }

  renderLevelUp() {
    console.log("Render Level Up");
    this.stopBattleTheme();
    return(
      <div className="LevelUp">
      </div>
    );
  }

  getItemName() {
    services.getItemName(this.state.itemsRecieved.item_id)
      .then(result => {
        this.setState({
          itemsRecievedName: result.data.data,
          itemsNameRecieved: true
        })
      })
      .catch(err => {
        console.log("Error here");
        console.log(err);
      })
  }

  checkForQuest() {
    let data = {
      character_id: this.state.character_id
    }
    services.getQuestLog(data)
      .then(result => {
        this.setState({
          questData: result.data.data
        })
        services.getQuestInfo(data)
          .then(result => {
            this.setState({
              questInfo: result.data.data
            })
            if(this.state.questData[0].iscomplete) {

            }else {
              if(this.state.questData[0].quest_id === 1) {
                let updateData = {
                  entry_id: this.state.questData[0].entry_id,
                  character_id: data.character_id
                }
                services.updateQuest(updateData)
                  .then(result => {

                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            }
          })
          .catch(err => {
            console.log(err);
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
              <h2 className="Fight-victory-contents-expGained">Exp Gained: 100</h2>
              <h3 className="Fight-victory-contents-itemName">Recieved Item: {this.state.itemsRecievedName.item_name}</h3>
              <h3 className="Fight-victory-contents-gold">Gold Recieved: 25</h3>
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

  renderDefeat() {
    return(
      <div className="Fight-player-defeated-container">
        <div className="Fight-player-defeated">
        </div>
        <button className="Fight-player-defeated-continue" onClick={(e) => this.handleDefeat()}>Continue</button>
      </div>
    );
  }

  handleDefeat() {
    let data = {
      health: 80,
      character_id: this.state.character_id
    }
    services.useItem(data)
      .then(result => {
        this.props.triggerGame();
      })
      .catch(err => {
        console.log(err);
      })
  }


  RNG(int){
    let numGen = Math.floor(Math.random() * int);
    return numGen;
  }

  //Audio Functions
  playKnightAttack() {
    let sound = document.querySelector('.KnightAttack');
    sound.currentTime = 0;
    sound.play();
  }

  playWizardAttack() {
    let sound = document.querySelector('.WizardAttack');
    sound.currentTime = 0;
    sound.play();
  }

  playWizardAttack2() {
    let sound = document.querySelector('.WizardAttack2');
    sound.currentTime = 0;
    sound.play();
  }

  playArcherAttack() {
    let sound = document.querySelector('.ArcherAttack');
    sound.currentTime = 0;
    sound.play();
  }

  playEnemyAttack() {
    let sound = document.querySelector('.EnemyAttack');
    sound.currentTime = 0;
    sound.play();
  }

  playLevelUp() {
    let levelUpSound = document.querySelector('.LevelUpSound');
    levelUpSound.currentTime = 0;
    levelUpSound.play();
  }
  /*END*/

  openModal() {
    let openSound = document.querySelector('.InventoryOpen');
    openSound.currentTime = 0;
    openSound.play();

    let modal = document.querySelector('.simpleModal-inventory');
    modal.style.display = "block";
    this.setState({
      modalOpen: true
    })
  }

  closeModal() {
    let openSound = document.querySelector('.InventoryClose');
    openSound.currentTime = 0;
    openSound.play();

    let modal = document.querySelector('.simpleModal-inventory');
    modal.style.display = "none";
    this.setState({
      modalOpen: false
    }, () => {
      this.componentDidMount();
    })
  }

  render() {
    return(
      <div className="Fight">

        {/* Health Bars */}
        <div className="Fight-healthBars-container">

          {/* Player Health */}
          <div className="Fight-healthBars-player-healthBar-container">
            <div className="Fight-healthBar-player-healthBar">
              <h1 className="Fight-player-health">Health: {this.state.characterInfo.health}</h1>
            </div>
          </div>

          {/* Enemy Health */}
          <div className="Fight-healthBar-enemy-healthBar-container">
            <div className="Fight-healthBar-enemy-healthBar">
              <h1 className="Fight-enemy-health">Enemy Health: {this.state.enemyHealth}</h1>
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
            <button className="Fight-attacks-attackOne" onClick={(e) => this.handleAttackOne()}>Attack One</button>
            <button className="Fight-attacks-attackOne" onClick={(e) => this.handleAttackTwo()}>Attack Two</button>
          </div>
        </div>
        <div className="simpleModal-inventory">
          <div className="modalContent-inventory">
            <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
            <h1 className="modalHeading-inventory">Inventory</h1>
            <div className="Game-Inventory-container">
              <Inventory character_id={this.state.character_id} />
            </div>
          </div>
        </div>

        {this.state.levelUp ? this.renderLevelUp() : ''}
        {this.state.enemyDefeated && !this.state.levelUp ? this.renderEnemyDefeated() : ''}
        {this.state.itemsNameRecieved && !this.state.levelUp ? this.renderVictory() : ''}
        {this.state.defeat ? this.renderDefeat() : ''}

        <button className="Fight-Inventory-button" onClick={(e) => this.openModal()}>Inventory</button>

        <audio className="BattleTheme" src={BattleTheme} />
        <audio className="KnightAttack" src={KnightAttack} />
        <audio className="WizardAttack" src={WizardAttack} />
        <audio className="WizardAttack2" src={WizardAttack2} />
        <audio className="ArcherAttack" src={ArcherAttack} />
        <audio className="EnemyAttack" src={EnemyAttack} />

        <audio className="InventoryOpen" src={InventoryOpen} />
        <audio className="InventoryClose" src={InventoryClose} />
        <audio className="LevelUpSound" src={LevelUp} />
      </div>
    );
  }
};

export default Fight;
