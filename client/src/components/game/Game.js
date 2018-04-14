import React, { Component } from 'react';
import services from '../../services/apiServices';

import Grid from '../Grid';
import Inventory from './Inventory';

//Audio Imports
import GameTheme from '../../public/sounds/dungeon';
import DoorOpen from '../../public/sounds/Effects/UI/doorOpen_2.ogg';
import InventoryOpen from '../../public/sounds/Effects/UI/cloth1.ogg';
import InventoryClose from '../../public/sounds/Effects/UI/clothBelt2.ogg';


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
    theme.currentTime = 0;
    theme.play();
  }

  renderCharacterInfo() {
    let info = this.state.apiData;
    return(
      <div className="Game-characterInfo-contents">
        <h1 className="Game-characterInfo-contents-name">{info.name}</h1>
        <h3 className="Game-characterInfo-contents-level">Level: {info.level}</h3>
        <h3 className="Game-characterInfo-contents-name">Exp: {info.experience}</h3>
      </div>
    );
  }

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
        <Grid />
        <div className="simpleModal-inventory">
          <div className="modalContent-inventory">
            <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
            <h1 className="modalHeading-inventory">Inventory</h1>
            <div className="Game-Inventory-container">
              <Inventory character_id={this.state.character_id} />
              {/* <h1 className="Gold">Gold: {this.state.characterInfo.gold}</h1> */}
            </div>
          </div>
        </div>
        <button className="Game-Inventory-button" onClick={(e) => this.openModal()}>Inventory</button>
        <button onClick={this.props.triggerFight}>Fight</button>
        <button onClick={this.props.triggerCharacterSelection}>Back to Character Selection</button>
        <button onClick={(e) => this.handleShopEnter()}>Shop</button>
        <audio className="GameTheme" src={GameTheme} />
        <audio className="DoorOpen" src={DoorOpen} />
        <audio className="InventoryOpen" src={InventoryOpen} />
        <audio className="InventoryClose" src={InventoryClose} />
      </div>
    );
  }
};

export default Game;
