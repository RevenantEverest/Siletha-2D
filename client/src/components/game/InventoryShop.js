import React, { Component } from 'react';
import services from '../../services/apiServices';

class InventoryShop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,

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
    })
    .catch(err => {
      console.log(err);
    })
    services.getInventoryByCharacterId(this.state.character_id)
      .then(results => {
        this.setState({
          apiData: results.data.data,
          apiDataRecieved: true
        })
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
        //play coin sound
      })
      .catch(err => {
        console.log(err);
      })
    //delete item from inventory
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

  handleItemBuy() {
    //remove gold from player
    //add item to inventory
  }

  render() {
    return(
      <div className="InventoryShop">
        {this.state.apiDataRecieved ? this.renderInventory() : ''}
      </div>
    );
  }
}

export default InventoryShop;
