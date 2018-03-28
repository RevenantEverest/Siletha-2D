import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link } from 'react-router-dom';

//Components
import HomePage from './components/HomePage';
import ChooseClass from './components/ChooseClass';

import Story from './components/Story';

import Knight from './components/classes/knight/Knight';
import KnightCombat from './components/classes/knight/KnightCombat';

import Archer from './components/classes/archer/Archer';
import ArcherCombat from './components/classes/archer/ArcherCombat';

import Wizard from './components/classes/wizard/Wizard';
import WizardCombat from './components/classes/wizard/WizardCombat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="App-Routes-Container">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/ChooseClass" component={ChooseClass} />
            <Route exact path="/Story" component={Story} />

            <Route exact path="/Knight" component={Knight} />
            <Route exact path="/KnightCombat" component={KnightCombat} />


            <Route exact path="/Archer" component={Archer} />
            <Route exact path="/ArcherCombat" component={ArcherCombat} />

            <Route exact path="/Wizard" component={Wizard} />
            <Route exact path="/WizardCombat" component={WizardCombat} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
