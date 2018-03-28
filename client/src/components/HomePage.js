import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect } from 'react-router-dom';
import HomePageCSS from '../public/style/HomePage.css'

//Image Imports
import Logo from '../public/images/Logo.png';

//Audio Imports
import HomePageTheme from '../public/sounds/FantasyMusic-TheLastOfHisName.wav';
import HomePagePlayButtonSound from '../public/sounds/buttonPress';

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      fireRedirect: false
    }
  }

  componentDidMount() {
    this.playHomePageTheme();
  }

  playHomePageTheme() {
    let HomePageTheme = document.querySelector('.HomePage-audio-main');
    HomePageTheme.play();
  }

  handlePlayButton() {
    let HomePagePlayButtonSound = document.querySelector('.HomePage-audio-playButtonClick');
    HomePagePlayButtonSound.play();
    setTimeout(() => {
      this.setState({
        fireRedirect: true
      })
    },1000)
  }

  render() {
    return(
      <div className="HomePage">
        <img className="HomePage-Logo" src={Logo}></img>
        <button className="HomePage-playButton" onClick={(e) => this.handlePlayButton()}>Play</button>
        <div className="HomePage-audio">
          <audio className="HomePage-audio-main" src={HomePageTheme}></audio>
          <audio className="HomePage-audio-playButtonClick" src={HomePagePlayButtonSound}></audio>
        </div>
        {this.state.fireRedirect ? <Redirect to="/Story" /> : ''}
      </div>
    );
  }
}

export default HomePage;
