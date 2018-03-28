import React, { Component } from 'react';

class Story extends Component {

  render() {
    return(
      <div className="Story">
        <h1>Story Page</h1>
        <div className="">
          <h1 className="one">The world of Acirhia was not always the peaceful place we all know. The Realm of Siletha is known for the peace of it's people. </h1>
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
