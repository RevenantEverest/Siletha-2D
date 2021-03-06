import React, { Component } from 'react';
import services from '../../services/apiServices';

//Audio Imports
import Coins from '../../public/sounds/Effects/UI/clothBelt2.ogg';

class InventoryShop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,

      blankInventory: false,

      character_id: this.props.character_id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleItemSell = this.handleItemSell.bind(this);
  }

  componentDidMount() {
    services.getCharacterInfo(this.state.character_id)
    .then(result => {
      this.setState({
        characterInfo: result.data.data
      })
      setTimeout(() => {
        services.getInventoryByCharacterId(this.state.character_id)
          .then(results => {
            this.setState({
              blankInventory: false,
              apiData: results.data.data,
              apiDataRecieved: true
            })
          })
          .catch(err => {
            this.setState({
              blankInventory: true
            })
            console.log(err);
          })
      }, 1000)
    })
    .catch(err => {
      console.log(err);
    })

  }

  renderInventory() {
    let InventoryShop = this.state.apiData.map((el, idx) => {
      return(
        <div className="InventoryShop-contents" key={idx}>
          <h3 className="InventoryShop-contents-item_name">{el.item_name}</h3>
          <h4 className="InventoryShop-contents-worth">Worth: {el.worth}</h4>
          <form onSubmit={this.handleItemSell}>
            <label>
              You sure you want to sell {el.item_name}?
              <input type="radio" name="entry_id" value={`${el.entry_id}`} onChange={this.handleChange} />
              <input type="radio" name="worth" value={`${el.worth}`} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Sell Item" />
          </form>
        </div>
      );
    })

    return(
      <div className="InventoryShop-contents-container">
        <div className="InventoryShop-contents-inner-container">
          {InventoryShop}
        </div>
        <h1 className="Inventory-shop-gold">Gold: {this.state.characterInfo.gold}</h1>
      </div>
    );
  }

  renderBlankInventory() {
    return(
      <div className="InventoryShop-contents-container">
        <div className="InventoryShop-contents-inner-container">
        </div>
        <h1>Inventory Is Empty</h1>
      </div>
    );
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  handleItemSell(e) {
    e.preventDefault();
    let data = {
      entrty_id: this.state.entry_id,
      gold: this.state.worth,
      character_id: this.state.character_id
    }
    console.log("data", data);
    //recieve worth of that item sold
    services.sellItem(data)
      .then(result => {
        this.removeItem(this.state.entry_id);
        this.playCoinDrop();
      })
      .catch(err => {
        console.log(err);
      })
  }

  removeItem() {
    let data = {
      entry_id: this.state.entry_id
    }
    services.removeItem(data)
      .then(result => {
        this.componentDidMount();
      })
      .catch(err => {

      })
  }

  playCoinDrop() {
    let sound = document.querySelector('.Coins');
    sound.currentTime = 0;
    sound.play();
  }

  render() {
    return(
      <div className="InventoryShop">
        {this.state.apiDataRecieved && !this.state.blankInventory ? this.renderInventory() : this.renderBlankInventory()}
        <audio className="Coins" src={Coins} />
      </div>
    );
  }
}

export default InventoryShop;
