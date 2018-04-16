import React, { Component } from 'react';
import services from '../../services/apiServices';

import InventoryShop from './InventoryShop';

//Auido Imports
import TavernMusic from '../../public/sounds/Shop/TavernMusic.mp3';
import Fireplace from '../../public/sounds/Shop/Fireplace.wav';
import Crowd from '../../public/sounds/Shop/Crowd.wav';
import DoorClose from '../../public/sounds/Effects/UI/doorClose_3.ogg';
import InventoryOpen from '../../public/sounds/Effects/UI/cloth1.ogg';
import InventoryClose from '../../public/sounds/Effects/UI/cloth2.ogg';
import Coins from '../../public/sounds/Effects/UI/clothBelt2.ogg';

class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsStocked: false,

      cannotBuy: false,

      characterInfo: null,
      character_id: this.props.character_id
    }
  }

  componentDidMount() {
    services.getCharacterInfo(this.state.character_id)
      .then(results => {
        this.setState({
          characterInfo: results.data.data,
          itemsStocked: true
        })
        let data = {
          character_id: this.state.character_id
        }
        services.getQuestLog(data)
          .then(result => {
            this.setState({
              questLog: result.data.data
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
    this.playAmbient();
  }

  playAmbient() {
    let music = document.querySelector('.TavernMusic');
    let fireplace = document.querySelector('.Fireplace');
    let crowd = document.querySelector('.Crowd');

    music.play();
    fireplace.play();
    crowd.play();
  }

  buyItemOne() {
    if(this.state.characterInfo.gold >= 50) {
      let data = {
        item_id: 14,
        character_id: this.state.character_id
      }
      this.setState({
        item_id: 14,
        canBuy: false
      })

      services.buyItem(data)
        .then(result => {
          this.playCoinDrop();
          setTimeout(() => {
            this.takeGold(50);
          }, 1000);
          if(this.state.questLog[0].quest_id ==2 && this.state.questLog[0].requirements < 5) {
            let questData = {
              entry_id: this.state.questLog[0].entry_id,
              character_id: this.state.character_id
            }
            services.updateQuest(questData)
              .then(result => {

              })
              .catch(err => {
                console.log(err);
              })
          }
        })
        .catch(err => {
          console.log(err);
        })
    }else {
      this.setState({
        cannotBuy: true
      })
    }
  }

  buyItemTwo() {
    console.log("Item 2");
    if(this.state.characterInfo.gold >= 80) {
      let data = {
        item_id: 15,
        character_id: this.state.character_id
      }
      this.setState({
        item_id: 15,
        canBuy: false
      })
      setTimeout(() => {
        this.setState({
          canBuy: true
        })
      }, 2000)

      services.buyItem(data)
        .then(result => {
          this.playCoinDrop();
          setTimeout(() => {
            this.takeGold(80);
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        })
    }else {
      this.setState({
        cannotBuy: true
      })
    }
  }

  takeGold(int) {
    let data = {
      gold: int,
      character_id: this.state.character_id
    }
    services.removeGold(data)
      .then(result => {
        this.setState({
          itemsStocked: false
        }, () => {
          this.componentDidMount()
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderCannotBuy() {
    return(
      <div className="Shop-cannot-buy">
        <h1 className="Shop-cannot-buy-h1">Not enough Gold</h1>
        {
          setTimeout(() => {
            this.setState({
              cannotBuy: false
            })
          }, 3000)
        }
      </div>
    );
  }

  handleExit() {
    let doorClose = document.querySelector('.DoorClose');
    doorClose.volume = 0.5;
    doorClose.currentTime = 0;
    doorClose.play();
    setTimeout(() => {
      this.props.triggerGame()
    }, 2000)
  }

  playCoinDrop() {
    let sound = document.querySelector('.Coins');
    sound.currentTime = 0;
    sound.play();
  }

  renderStock() {
    return(
      <div className="Shop-container">
        <div className="simpleModal-inventory">
          <div className="modalContent-inventory">
            <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
            <h1 className="modalHeading-inventory">Inventory</h1>
            <div className="Game-Inventory-container">
              <InventoryShop character_id={this.state.character_id} characterInfo={this.state.characterInfo}/>
            </div>
          </div>
        </div>
        <div className="Shop-stock-container">
          <div className="Shop-stock-contents">
            <div className="Shop-stock-healthPotion-container">
              <div className="Shop-stock-healthPotion" onClick={(e) => this.buyItemOne()}>
              </div>
              <h1 className="Shop-stock-healthPotion-h1">Health Potion</h1>
              <div className="Shop-stock-largeHealthPotion" onClick={(e) => this.buyItemTwo()}>
              </div>
              <h1 className="Shop-stock-largeHealthPotion-h1">Large Health Potion</h1>
            </div>
          </div>
        </div>
        <h1 className="Shop-player-gold">Gold {this.state.characterInfo.gold}</h1>
        <button className="Shop-Inventory-button" onClick={(e) => this.openModal()}>Inventory</button>
        <button className="Shop-exit-button" onClick={(e) => this.handleExit()}>Exit Shop</button>
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
    this.componentDidMount();
  }

  render() {
    return(
      <div className="Shop">
        {this.state.cannotBuy ? this.renderCannotBuy() : ''}
        {this.state.itemsStocked ? this.renderStock() : ''}
        <audio className="TavernMusic" src={TavernMusic} />
        <audio className="Fireplace" src={Fireplace} />
        <audio className="Crowd" src={Crowd} />
        <audio className="DoorClose" src={DoorClose} />
        <audio className="InventoryOpen" src={InventoryOpen} />
        <audio className="InventoryClose" src={InventoryClose} />
        <audio className="Coins" src={Coins} />
      </div>
    );
  }
}

export default Shop;
