import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import ChooseCharacter from './ChooseCharacter';
import Game from './Game';

class DummyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      renderChooseCharacter: true,
      renderGame: false
    }
    this.setCharacter = this.setCharacter.bind(this);
  }

  setCharacter(id) {
    this.setState({
      character_id: id,
      renderChooseCharacter: false,
      renderGame: true
    })
  }

  render() {
    return(
      <div>
        {this.state.renderChooseCharacter ? <ChooseCharacter userData={this.state.userData} setCharacter={this.setCharacter} /> : ''}
        {this.state.renderGame ? <Game character_id={this.state.character_id} /> : ''}
      </div>
    );
  }
};

export default DummyComponent;
