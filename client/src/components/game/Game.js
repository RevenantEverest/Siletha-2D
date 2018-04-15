import React, { Component } from 'react';
import services from '../../services/apiServices';

import Grid from '../Grid';
import Inventory from './Inventory';
import QuestLog from './QuestLog';

//Audio Imports
import GameTheme from '../../public/sounds/dungeon';
import DoorOpen from '../../public/sounds/Effects/UI/doorOpen_2.ogg';
import InventoryOpen from '../../public/sounds/Effects/UI/cloth1.ogg';
import InventoryClose from '../../public/sounds/Effects/UI/cloth2.ogg';


class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,
      characterInfo: this.props.characterInfo,
      character_id: this.props.character_id,

      renderAvatar: null
    }
  }

  componentDidMount() {
    if(this.state.characterInfo.class_id == 1){
      this.setState({
        renderAvatar: 'Game-avatar-knight'
      })
    }else if(this.state.characterInfo.class_id == 2) {
      this.setState({
        renderAvatar: 'Game-avatar-wizard'
      })
    }else if(this.state.characterInfo.class_id == 3) {
      this.setState({
        renderAvatar: 'Game-avatar-archer'
      })
    }
    services.getCharacterInfo(this.state.character_id)
      .then(results => {
        this.setState({
          apiData: results.data.data,
          apiDataRecieved: true
        })
      })
      .catch(err => {
        console.log(err);
      })
    this.playTheme();
  }

  playTheme() {
    let theme = document.querySelector('.GameTheme');
    theme.play();
  }

  renderCharacterInfo() {
    let info = this.state.apiData;
    return(
      <div className="Game-characterInfo-contents">
        <h1 className="Game-characterInfo-contents-name">{info.name}</h1>
        <h3>Health: {info.health}</h3>
        <h4 className="Game-characterInfo-contents-level">Level: {info.level}</h4>
        <h4 className="Game-characterInfo-contents-name">Exp: {info.experience}</h4>
      </div>
    );
  }

  openModalInventory() {
    let openSound = document.querySelector('.InventoryOpen');
    openSound.currentTime = 0;
    openSound.play();

    let modal = document.querySelector('.simpleModal-inventory');
    modal.style.display = "block";
    this.setState({
      modalOpen: true
    })
  }

  closeModalInventory() {
    let openSound = document.querySelector('.InventoryClose');
    openSound.currentTime = 0;
    openSound.play();

    this.componentDidMount();

    let modal = document.querySelector('.simpleModal-inventory');
    modal.style.display = "none";
    this.setState({
      modalOpen: false
    })
  }

  openModalQuestLog() {
    let openSound = document.querySelector('.InventoryOpen');
    openSound.currentTime = 0;
    openSound.play();

    let modal = document.querySelector('.simpleModal-questLog');
    modal.style.display = "block";
    this.setState({
      modalOpen: true
    })
  }

  closeModalQuestLog() {
    let openSound = document.querySelector('.InventoryClose');
    openSound.currentTime = 0;
    openSound.play();

    this.componentDidMount();

    let modal = document.querySelector('.simpleModal-questLog');
    modal.style.display = "none";
    this.setState({
      modalOpen: false
    })
  }

  handleShopEnter() {
    let doorOpen = document.querySelector('.DoorOpen');
    doorOpen.currentTime = 0;
    doorOpen.play();
    setTimeout(() => {
      this.props.triggerShop();
    }, 2000)
  }

  render() {
    return(
      <div className="Game">
        <div className="Game-avatar-container">
          {this.state.apiDataRecieved ? this.renderCharacterInfo() : ''}
          <div className={`${this.state.renderAvatar}`}>
          </div>
        </div>
        {/* <Grid /> */}
        <div className="simpleModal-inventory">
          <div className="modalContent-inventory">
            <span className="closeButton" onClick={(e) => this.closeModalInventory()}>&times;</span>
            <h1 className="modalHeading-inventory">Inventory</h1>
            <div className="Game-Inventory-container">
              <Inventory character_id={this.state.character_id} />
              {/* <h1 className="Gold">Gold: {this.state.characterInfo.gold}</h1> */}
            </div>
          </div>
        </div>
        <div className="simpleModal-questLog">
          <div className="modalContent-questLog">
            <span className="closeButton" onClick={(e) => this.closeModalQuestLog()}>&times;</span>
            <h1 className="modalHeading-questLog">QuestLog</h1>
            <div className="Game-questLog-container">
              <QuestLog character_id={this.state.character_id} />
              {/* <h1 className="Gold">Gold: {this.state.characterInfo.gold}</h1> */}
            </div>
          </div>
        </div>
        <button className="Game-Inventory-button" onClick={(e) => this.openModalInventory()}>Inventory</button>
        <button className="Game-QuestLog-button" onClick={(e) => this.openModalQuestLog()}>Quest Log</button>
        <button className="Game-fight-trigger" onClick={this.props.triggerFight}>Fight</button>
        <button className="Game-character-selection-trigger" onClick={this.props.triggerCharacterSelection}>Back to Character Selection</button>
        <button className="Game-shop-enter-trigger" onClick={(e) => this.handleShopEnter()}>Shop</button>
        <button className="Game-town-enter-trigger" onClick={this.props.triggerTown}>Town</button>

        {/* Audio */}
        <audio className="GameTheme" src={GameTheme} />
        <audio className="DoorOpen" src={DoorOpen} />
        <audio className="InventoryOpen" src={InventoryOpen} />
        <audio className="InventoryClose" src={InventoryClose} />
      </div>
    );
  }
};

export default Game;
