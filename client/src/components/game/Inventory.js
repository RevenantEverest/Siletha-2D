import React, { Component } from 'react';
import services from '../../services/apiServices';

//Audio Imports
import BottleDrink from '../../public/sounds/Effects/UI/bottle.wav';

class Inventory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,

      blankInventory: false,

      character_id: this.props.character_id,
      characterInfo: this.props.characterInfo,
      characterInfoRecieved: false
    }
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    services.getCharacterInfo(this.state.character_id)
      .then(result => {
        this.setState({
          characterInfo: result.data.data,
          characterInfoRecieved: true
        })
      })
      .catch(err => {
        console.log(err);
      })

    services.getInventoryByCharacterId(this.state.character_id)
      .then(result => {
        this.setState({
          apiData: result.data.data,
          apiDataRecieved: true,
          blankInventory: false
        })
      })
      .catch(err => {
        this.setState({
          blankInventory: true
        })
        console.log(err);
      })
  }

  renderInventory() {
      let Inventory = this.state.apiData.map((el, idx) => {
        return(
          <ul className="Inventory-items-UL" key={idx}>
            <li className="Inventory-items-li">
              <div className="Inventory-contents-items">
                <h1 className="Inventory-contents-items-name">{el.item_name}</h1>
                <button className="Iventory-useItem" onClick={(e) => this.getItemId(el.entry_id)}>Use Item</button>
                {/* <form className="Inventory-item-remove" onSubmit={this.removeItem}>
                  <label className="Inventory-contents-items-label">
                    Use item?
                    <input type="radio" name="entry_id" value={`${el.entry_id}`} onChange={this.handleChange} />
                  </label>
                  <input className="Iventory-input-delete" type="submit" value="&times;" />
                </form> */}
              </div>
            </li>
          </ul>
        );
      })

      return(
        <div className="Inventory-contents">
          {Inventory}
        </div>
      );
  }

  renderBlankInventory() {
    return(
      <div className="Inventory-contents">
      </div>
    );
  }

  getItemId(entryId) {
    let data = {
      entry_id: entryId
    }
    services.getItemByEntry_id(data)
      .then(result => {
        this.setState({
          item_id: result.data.data
        }, () => {
          this.removeItem(data.entry_id);
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  removeItem(entryId) {
    let data = {
      entry_id: entryId
    }
    if(this.state.item_id[0].item_id == 14) {
      console.log("If statement working");
      services.removeItem(data)
      .then(() => {
        console.log("Removed Item");
        this.useItem();
      })
      .catch(err => {
        console.log(err);
      })
    }else {
      this.setState({
        cannotUse: true
      })
      setTimeout(() => {
        this.setState({
          cannotUse: false
        })
      }, 1000)
    }
  }

  useItem() {
    console.log("Use item being called");
    let data = {
      health: 20,
      character_id: this.state.character_id
    }
    services.useItem(data)
      .then(result => {
        this.playBottleDrink();
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderCannotUse() {
    if(!this.state.apiDataRecieved) {
      return(
        <div className="Inventory-blank">
        </div>
      );
    }else {
      return(
        <div className="Inventory-CannotUse">
          <h1>You can't use this item</h1>
        </div>
      );
    }
  }

  //Audio Methods
  playBottleDrink() {
    let sound = document.querySelector('.BottleDrink');
    sound.currentTime = 0;
    sound.play();
  }

  render() {
    return(
      <div className="Inventory">
        <div className="Inventory-container">
          {this.state.apiDataRecieved && !this.state.cannotUse ? this.renderInventory() : this.renderCannotUse()}
          {!this.state.apiDataRecieved && this.state.blankInventory ? this.renderBlankInventory() : ''}
        </div>
        {this.state.characterInfoRecieved ? <h1 className="Gold">Gold: {this.state.characterInfo.gold}</h1> : ''}
        <audio className="BottleDrink" src={BottleDrink} />
      </div>
    );
  }
};

export default Inventory;
