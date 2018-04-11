import React, { Component } from 'react';
import Grid from '../Grid';

import services from '../../services/apiServices';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,
      character_id: this.props.character_id
    }
    this.renderInventory = this.renderInventory.bind(this)
  }

  componentDidMount() {
    console.log(this.state.character_id);
    services.getInventoryByCharacterId(this.state.character_id)
      .then(result => {
        this.setState({
          apiData: result.data.data,
          apiDataRecieved: true
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderInventory() {
    let Inventory = this.state.apiData.map((el, idx) => {
      console.log(el.item_name);
      return(
        <div className="Game-Inventory-contents-items">
          <h1>{el.item_name}</h1>
        </div>
      );
    })

    return(
      <div className="Game-Inventory-contents-">
        {Inventory}
      </div>
    );
  }

  render() {
    return(
      <div className="Game">
        <Grid />
        <div className="Game-Inventory-container">
          <div className="Game-Inventory-container">
            {this.state.apiDataRecieved ? this.renderInventory() : ''}
            <button onClick={this.props.triggerFight}>Fight</button>
            <button onClick={this.props.triggerCharacterSelection}>Back to Character Selection</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Game;
