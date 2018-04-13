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

      );
    })

    return(
      <div className="InventoryShop-contents-container">
        {InventoryShop}
      </div>
    );
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
