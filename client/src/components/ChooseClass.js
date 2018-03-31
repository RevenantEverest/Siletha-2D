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

  componentDidMount() {
    this.playTheme();
  }

  playTheme() {
    let mainTheme = document.querySelector('.ChooseClass-audio-mainTheme');
    mainTheme.play();
  }

  buttonPress() {
    let buttonPress = document.querySelector('.ChooseClass-audio-buttonPress');
    buttonPress.play();
  }

  handleKnightButton() {
    this.buttonPress();
    setTimeout(() => {
      this.setState({
        fireRedirectKnight: true
      })
    }, 1000)
  }

  handleWizardButton() {
    this.buttonPress();
    setTimeout(() => {
      this.setState({
        fireRedirectWizard: true
      })
    } ,1000)
  }

  handleArcherButton() {
    this.buttonPress();
    setTimeout(() => {
      this.setState({
        fireRedirectArcher: true
      })
    }, 1000)
  }

  render() {
    return(
      <div className="ChooseClass">
        <div className="ChooseClass-Container">
          <h1 className="ChooseClass-text">Choose Your Class:</h1>
          <div className="ChooseClass-knight">
            <button className="ChooseClass-knight-button" onClick={(e) => this.handleKnightButton()}>
              <div className="ChooseClass-knight-inner-image"></div>
            </button>
            <h1 className="ChooseClass-knight-text">KNIGHT</h1>
          </div>
          <div className="ChooseClass-wizard">
            <button className="ChooseClass-wizard-button" onClick={(e) => this.handleWizardButton()}>
              <div className="ChooseClass-wizard-inner-image"></div>
            </button>
            <h1 className="ChooseClass-wizard-text">WIZARD</h1>
          </div>
          <div className="ChooseClass-archer">
            <button className="ChooseClass-archer-button" onClick={(e) => this.handleArcherButton()}>
              <div className="ChooseClass-archer-inner-image"></div>
            </button>
            <h1 className="ChooseClass-archer-text">ARCHER</h1>
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
