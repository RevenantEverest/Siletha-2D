import React, { Component } from 'react';

import StoryCSS from '../public/style/Story.css';

class Story extends Component {

  constructor() {
    super();
    this.state = {
      narritive: `The world of Acirhia was not always the peaceful place we all know. The Realm of Siletha is known for the peace of it's people.`
    }
  }

  render() {
    return(
      <div className="Story">
        <div className="Story-Contents-Container">
          <h1 className="Story-Contents">{this.state.narritive}</h1>
        </div>
        <div className="Story-audio">
          <button type="button" className="nextButton">NEXT</button>
          <audio className="mainTheme" src="Sounds/KH2DB.wav"></audio>
          <audio className="start" src="Sounds/Effects/UI/buttonPress"></audio>
        </div>
      </div>
    );
  }
}

export default Story;
