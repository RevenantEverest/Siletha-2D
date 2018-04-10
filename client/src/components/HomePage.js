import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//Image Imports
import Logo from '../public/images/Logo.png';

//Audio Imports
import HomePageTheme from '../public/sounds/FantasyMusic-TheLastOfHisName.wav';
import HomePagePlayButtonSound from '../public/sounds/buttonPress';

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      fadeOut: '',
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
    this.setState({
      fadeOut: 'HomePage-Contents-fadeOut'
    })
    setTimeout(() => {
      this.setState({
        fireRedirect: true
      })
    }, 2000)
  }

  render() {
    return(
      <div className="HomePage">
        <img className={`HomePage-Logo ${this.state.fadeOut}`} src={Logo} alt=''></img>
        <button className={`HomePage-playButton ${this.state.fadeOut}`} onClick={(e) => this.handlePlayButton()}>Play</button>
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
