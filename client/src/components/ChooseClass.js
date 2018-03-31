import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect } from 'react-router-dom';

//Audio Imports
import ChooseClassTheme from '../public/sounds/FantasyCelticMusic-SpiritOfTheWild.wav';
import ButtonPress from '../public/sounds/Effects/UI/chooseClass';

class ChooseClass extends Component {

  constructor() {
    super();
    this.state ={
      fireRedirectKnight: false,
      fireRedirectWizard: false,
      fireRedirectArcher: false
    }
  }

  handleKnightButton() {
    this.setState({
      fireRedirectKnight: true
    })
  }

  handleWizardButton() {
    this.setState({
      fireRedirectWizard: true
    })
  }

  handleArcherButton() {
    this.setState({
      fireRedirectArcher: true
    })
  }

  render() {
    return(
      <div className="ChooseClass">
        <div className="ChooseClass-Container">
          <h1 className="ChooseClass-text">Choose Your Class:</h1>
          <div className="ChooseClass-knight">
            <div class="innerImageKnight"></div>
            <button className="ChooseClass-knight-button" onClick={(e) => this.handleKnightButton()}></button>
            <h1 class="knightClass">KNIGHT</h1>
          </div>
          <div className="ChooseClass-wizard">
            <div class="innerImageWizard"></div>
            <button className="ChooseClass-wizard-button" onClick={(e) => this.handleWizardButton()}></button>
            <h1 class="wizardClass">WIZARD</h1>
          </div>
          <div className="ChooseClass-archer">
            <button className="ChooseClass-archer-button" onClick={(e) => this.handleArcherButton()}></button>
            <div class="innerImageArcher"></div>
            <h1 class="archerClass">ARCHER</h1>
          </div>
        </div>
        <div className="ChooseClass-audio">
          <audio className="ChooseClass-audio-mainTheme" src={ChooseClassTheme}></audio>
          <audio className="ChooseClass-audio-buttonPress" src={ButtonPress}></audio>
        </div>
        {this.state.fireRedirectKnight ? <Redirect to="/Knight" /> : ''}
        {this.state.fireRedirectWizard ? <Redirect to="/Wizard" /> : ''}
        {this.state.fireRedirectArcher ? <Redirect to="/Archer" /> : ''}
      </div>
    );
  }
}

export default ChooseClass;
