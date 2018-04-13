import React, { Component } from 'react';
import services from '../../services/apiServices';

import Inventory from './Inventory';

class Shop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsStocked: false,

      characterInfo: this.props.characterInfo,
      character_id: this.props.character_id
    }
  }

  sellItem() {

  }

  buyItem() {

  }

  openModal() {
    let modal = document.querySelector('.simpleModal-inventory');
    modal.style.display = "block";
    this.setState({
      modalOpen: true
    })
  }

  closeModal() {
   console.log('Hello I Should Be Closing')
    let modal = document.querySelector('.simpleModal-inventory');
    modal.style.display = "none";
    this.setState({
      modalOpen: false
    })
  }

  render() {
    return(
      <div className="Shop">
        <div className="simpleModal-inventory">
          <div className="modalContent-inventory">
            <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
            <h1 className="modalHeading-inventory">Inventory</h1>
            <div className="Game-Inventory-container">
              <Inventory character_id={this.state.character_id} characterInfo={this.state.characterInfo}/>
              <h1 className="Gold">Gold: {this.state.characterInfo.gold}</h1>
            </div>
          </div>
        </div>
        <div className="Shop-stock-container">
          <div className="Shop-stock-contets">
            {this.state.itemsStocked ? this.renderStock() : ''}
          </div>
        </div>
        <button className="Game-Inventory-button" onClick={(e) => this.openModal()}>Inventory</button>
        <button onClick={this.props.triggerGame}>Back to Game</button>
      </div>
    );
  }
}

export default Shop;
