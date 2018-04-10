import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route} from 'react-router-dom';

//Components
import HomePage from './components/HomePage';
import Story from './components/Story';

import ChooseCharacter from './components/ChooseCharacter';
import CreateCharacter from './components/CreateCharacter';

import Game from './components/Game';

class App extends Component {

  constructor() {
    super();
    this.state = {
      userData: 1
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="App-Routes-Container">
            <Route exact path="/" component={HomePage} />
            <Route path="/Story" component={Story} />

            <Route exact path="/ChooseCharacter" component={
              () => (<ChooseCharacter userData={this.state.userData} />
            )} />

            <Route exact path="/CreateCharacter" component={
              () => (<CreateCharacter userData={this.state.userData} />
            )} />

            <Route exact path="/Game" component={Game} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
