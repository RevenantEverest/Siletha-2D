import React, { Component } from 'react';
import services from '../../services/apiServices';

import Grid from '../Grid';
import Inventory from './Inventory';


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
  }

  openModal() {
    let modal = document.querySelector('.simpleModal');
    modal.style.display = "block";
    this.setState({
      modalOpen: true
    })
  }

  closeModal() {
   console.log('Hello I Should Be Closing')
    let modal = document.querySelector('.simpleModal');
    modal.style.display = "none";
    this.setState({
      modalOpen: false
    })
  }

  render() {
    return(
      <div className="Game">
        <div className="Game-avatar-container">
          <div className={`${this.state.renderAvatar}`}>
          </div>
        </div>
        <Grid />
        <div className="simpleModal">
          <div className="modalContent">
            <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
            <h1 className="modalHeading">Inventory</h1>
            <div className="Game-Inventory-container">
              <Inventory character_id={this.state.character_id} characterInfo={this.state.characterInfo}/>
              <h1>Gold: {this.state.characterInfo.gold}</h1>
            </div>
          </div>
        </div>
        <button className="Game-Inventory-button" onClick={(e) => this.openModal()}>Inventory</button>
        <button onClick={this.props.triggerFight}>Fight</button>
        <button onClick={this.props.triggerCharacterSelection}>Back to Character Selection</button>
      </div>
    );
  }
};

export default Game;
