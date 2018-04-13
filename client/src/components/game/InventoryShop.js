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
    this.sellItem = this.sellItem.bind(this);
  }

  componentDidMount() {
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
        <div className="InventoryShop-contents">
          <h3 className="InventoryShop-contents-item_name">{el.item_name}</h3>
          <h4 className="InventoryShop-contents-worth">Worth: {el.worth}</h4>
          <form onSubmit={this.sellItem}>
            <label>
              You sure you want to sell {el.item_name}?
              <input type="radio" name="entry_id" value={`${el.entry_id}`} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Sell Item"/>
          </form>
        </div>
      );
    })

    return(
      <div className="InventoryShop-contents-container">
        {InventoryShop}
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
      entrty_id: this.state.entry_id
    }
    //delete item from inventory
    services.removeItem(data)
      .then(results => {
        this.getGoldFromSale()
      })
      .catch(err => {
        console.log(err);
      })

    //recieve worth of that item sold
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
