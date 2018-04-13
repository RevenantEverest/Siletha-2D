import React, { Component } from 'react';
import services from '../services/apiServices';

import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import ChooseCharacter from './ChooseCharacter';
import Game from './game/Game';
import Fight from './game/Fight';
import Shop from './game/Shop';

class DummyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      renderChooseCharacter: true,
      renderGame: false,
      renderFight: false,
      renderShop: false,
      characterInfo: null,
      playerHealth: 100
    }
    this.setCharacter = this.setCharacter.bind(this);
    this.triggerFight = this.triggerFight.bind(this);
    this.triggerGame = this.triggerGame.bind(this);
    this.triggerCharacterSelection = this.triggerCharacterSelection.bind(this);
    this.triggerShop = this.triggerShop.bind(this);
  }

  getCharacterInfo(id) {
    services.getCharacterInfo(id)
      .then(result => {
        this.setState({
          characterInfo: result.data.data,

        }, () => {
          this.setState({
            renderGame: true
          })
          console.log('Character Info', this.state)
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  setCharacter(id) {
    this.setState({
      character_id: id,
      renderChooseCharacter: false
    })
    this.getCharacterInfo(id)

  }

  triggerFight() {
    this.setState({
      renderGame: false,
      renderFight: true
    })
  }

  triggerGame() {
    this.setState({
      renderShop: false,
      renderFight: false,
      renderGame: true
    })
  }

  triggerCharacterSelection() {
    this.setState({
      renderShop: false,
      renderFight: false,
      renderGame: false,
      renderChooseCharacter: true
    })
  }

  triggerShop() {
    this.setState({
      renderFight: false,
      renderGame: false,
      renderChooseCharacter: false,
      renderShop: true
    })
  }

  render() {
    return(
      <div>
        {this.state.renderChooseCharacter ? <ChooseCharacter userData={this.state.userData} setCharacter={this.setCharacter} /> : ''}
        {this.state.renderGame ? <Game characterInfo={this.state.characterInfo} character_id={this.state.character_id} triggerFight={this.triggerFight} triggerCharacterSelection={this.triggerCharacterSelection} triggerShop={this.triggerShop} playerHealth={this.state.playerHealth} /> : ''}
        {this.state.renderFight ? <Fight characterInfo={this.state.characterInfo} character_id={this.state.character_id} triggerGame={this.triggerGame} playerHealth={this.state.playerHealth} /> : ''}
        {this.state.renderShop ? <Shop characterInfo={this.state.characterInfo} character_id={this.state.character_id} triggerGame={this.triggerGame} /> : ''}
      </div>
    );
  }
};

export default DummyComponent;
