import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import ChooseCharacter from './ChooseCharacter';
import Game from './game/Game';
import Fight from './game/Fight';

class DummyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      renderChooseCharacter: true,
      renderGame: false,
      renderFight: false
    }
    this.setCharacter = this.setCharacter.bind(this);
    this.triggerFight = this.triggerFight.bind(this);
    this.triggerGame = this.triggerGame.bind(this);
    this.triggerCharacterSelection = this.triggerCharacterSelection.bind(this);
  }

  setCharacter(id) {
    this.setState({
      character_id: id,
      renderChooseCharacter: false,
      renderGame: true
    })
  }

  triggerFight() {
    this.setState({
      renderGame: false,
      renderFight: true
    })
  }

  triggerGame() {
    this.setState({
      renderFight: false,
      renderGame: true
    })
  }

  triggerCharacterSelection() {
    this.setState({
      renderFight: false,
      renderGame: false,
      renderChooseCharacter: true
    })
  }

  render() {
    return(
      <div>
        {this.state.renderChooseCharacter ? <ChooseCharacter userData={this.state.userData} setCharacter={this.setCharacter} /> : ''}
        {this.state.renderGame ? <Game character_id={this.state.character_id} triggerFight={this.triggerFight} triggerCharacterSelection={this.triggerCharacterSelection}/> : ''}
        {this.state.renderFight ? <Fight character_id={this.state.character_id} triggerGame={this.triggerGame} /> : ''}
      </div>
    );
  }
};

export default DummyComponent;
