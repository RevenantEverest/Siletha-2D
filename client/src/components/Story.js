import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import NC from '../Narritive';

//Audio Imports
import StoryTheme from '../public/sounds/KH2DB.wav';
import StoryButtonPress from '../public/sounds/buttonPress';

let updateCurrentNarritive = 0;

class Story extends Component {

  constructor() {
    super();
    this.state = {
      currentNarritive: 0,
      narritive: null,
      fadeInFadeOut: 'Story-Contents-Container-fadeIn',
      nextButton: 'Story-next-button-display',
      beginButton: 'Story-begin-button-hidden',
      fireRedirect: false
    }
  }

  componentDidMount() {
    this.setState({
      narritive: NC.narritive[0]
    })
    this.playAudio();
  }

  playAudio() {
    let mainTheme = document.querySelector('.Story-audio-mainTheme');
    mainTheme.play();
  }

  handleNextButton() {
    updateCurrentNarritive++
    if(updateCurrentNarritive <= 6) {
      this.setState({
        currentNarritive: updateCurrentNarritive
      })
      this.handleUpdateNarritive();
    }else{
      this.setState({
        nextButton: 'Story-next-button-hidden',
        beginButton: 'Story-begin-button-display'
      })
    }
    return updateCurrentNarritive
  }

  handleUpdateNarritive() {
    let currentNarritive = this.state.currentNarritive;
    this.setState({
      narritive: NC.narritive[currentNarritive]
    })
  }

  handleBeginButton() {
    this.setState({
      fireRedirect: true
    })
  }

  fadeOut() {
    this.setState({
      fadeInFadeOut: 'Story-contents-fadeOut'
    })
  }

  fadeIn() {
    this.setState({
      fadeInFadeOut: 'Story-contents-fadeIn'
    })
  }

  render() {
    return(
      <div className="Story">
        <div className={`Story-Contents-Container ${this.state.fadeInFadeOut}`}>
          <h1 className='Story-Contents'>{this.state.narritive}</h1>
        </div>
          <div className="Story-audio">
            <button className={`${this.state.nextButton}`} onClick={(e) => this.handleNextButton()}>NEXT</button>
            <button className={`${this.state.beginButton}`} onClick={(e) => this.handleBeginButton()}>Begin Journey...</button>
            <audio className="Story-audio-mainTheme" src={StoryTheme}></audio>
            <audio className="Story-audio-buttonPress" src={StoryButtonPress}></audio>
          </div>
          {this.state.fireRedirect ? <Redirect to="/Game"/> : ''}
      </div>
    );
  }
}

export default Story;
