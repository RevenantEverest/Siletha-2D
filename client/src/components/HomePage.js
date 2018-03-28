import React, { Component } from 'react';

class HomePage extends Component {

  render() {
    return(
      <div className="HomePage">
        <h1>Home Page</h1>
        <img src="images/Logo.png" />
        <nav>
            <button className="playButton">Play</button>
        </nav>
        <div className="HomePage-audio">
          <audio src="Sounds/Fantasy%20Music%20-%20The%20Last%20of%20His%20Name.wav"></audio>
          <audio className="play" src="Sounds/Effects/UI/buttonPress"></audio>
        </div>
      </div>
    );
  }
}

export default HomePage;
