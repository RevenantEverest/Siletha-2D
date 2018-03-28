import React, { Component } from 'react';

class ChooseClass extends Component {

  render() {
    return(
      <div className="ChooseClass">
        <h1>Choose Class Page</h1>
        <div class="chooseClassContainer">
            <h1 class="chooseClassText">Choose Your Class:</h1>
        </div>
        <button type="button" class="knight">
        </button>
        <button type="button" class="wizard">
        </button>
        <button type="button" class="archer">
        </button>
        <div className="ChooseClass-audio">
          <audio className="mainTheme" src="Sounds/Fantasy%20Celtic%20Music%20-%20Spirit%20of%20the%20Wild.wav"></audio>
          <audio className="buttonPress" src="Sounds/Effects/UI/chooseClass"></audio>
        </div>
      </div>
    );
  }
}

export default ChooseClass;
