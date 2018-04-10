import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route} from 'react-router-dom';

//Components
import HomePage from './components/HomePage';
import Story from './components/Story';

import ChooseCharacter from './components/ChooseCharacter';
import CreateCharacter from './components/CreateCharacter';

import DummyComponent from './components/DummyComponent';

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
            <Route path="/Game" component={
              () => (<DummyComponent userData={this.state.userData} />
            )} />


            {/* <Route exact path="/ChooseCharacter" component={
              () => (<ChooseCharacter userData={this.state.userData} />
            )} /> */}

            <Route exact path="/CreateCharacter" component={
              () => (<CreateCharacter userData={this.state.userData} />
            )} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
