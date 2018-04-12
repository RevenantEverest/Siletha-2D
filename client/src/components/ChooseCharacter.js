import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

import services from '../services/apiServices';

import CreateCharacter from './CreateCharacter';
import Game from './game/Game';

class ChooseCharacter extends Component {

  constructor(props) {
    super(props);
    this.state ={
      userData: this.props.userData,
      apiData: null,
      apiDataRecieved: false,
      createCharacterRedirect: false,
      playGameRedirect: false,
      modalOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.createCharacter = this.createCharacter.bind(this);
  }

  componentDidMount() {
    services.getCharactersByUserId(this.state.userData)
      .then(result => {
        this.setState({
          apiData: result.data.data,
          apiDataRecieved: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  openModal() {
    let modal = document.querySelector('.simpleModal');
    modal.style.display = "block";
    this.setState({
      modalOpen: true
    })
  }

  closeModal() {
   console.log('Hello I Should Be Closing')
    let modal = document.querySelector('.simpleModal');
    modal.style.display = "none";
    this.setState({
      modalOpen: false
    })
  }

  handleChange(e) {
    console.log('HANDLE CHANGE--->', e)
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  handleDeleteSubmit(e) {
    e.preventDefault();
    console.log('handle delete submit--->', e);
    console.log(this.state.character_id);
    services.deleteCharacter(this.state.character_id)
      .then(() => {
        console.log(`Character ${this.state.character_id} deleted`);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderCharacters() {
    const CharacterNames = this.state.apiData.map((el, idx) => {
      let class_name = '';
      switch (el.class_id) {
        case 1:
          class_name = "Knight"
          break;
        case 2:
          class_name = "Wizard"
          break;
        case 3:
          class_name = "Archer"
          break;
        default:
          class_name = ""
          break;
      }
      return(
        <div className={`ChooseCharacter-characterList-contents-characters character-${el.character_id}`} key={idx} onClick={(e) => this.handleCharacterSelection(el.character_id)}>
          <div className="ChooseCharacter-characterList-contents-characters-text">
            <h3>{el.name}</h3>
            <h3>Level: {el.level} {class_name}</h3>
            <form onSubmit={this.handleDeleteSubmit}>
              <label className="ChooseCharacter-contents-characters-label">
                <input type="radio" name="character_id" value={`${el.character_id}`} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Delete" />
            </form>
          </div>
        </div>
      );
    })

    return(
      <div className="ChooseCharacter-characterList">
        <div className="ChooseCharacter-characterList-header-container">
          <h1 className="ChooseCharacter-characterList-header">Characters</h1>
        </div>
        <div className="ChooseCharacter-characterList-container-container">
          <div className="ChooseCharacter-characterList-container">
            <div className="ChooseCharacter-characterList-contents">
              {CharacterNames}
            </div>
          </div>
        </div>
        <button className="ChooseCharacter-create-character-button" onClick={(e) => this.openModal()}>Create Character</button>
      </div>
    );

  }

  handleCharacterSelection(id) {
    let button = document.querySelector(`.character-${id}`);
    button.backgroundColor = "#333333";
    this.setState({
      character_id: id
    }, () => {
      console.log('State =>', this.state.character_id);
    })

  }

  handlePlayButton() {
    let character_id = parseInt(this.state.character_id, 10)
    this.props.setCharacter(character_id)
  }

  createCharacter() {
    this.closeModal();
    this.componentDidMount();
  }

  render() {
    return(
      <div className="ChooseCharacter">
        <Router>
          <div className="ChooseCharacter-router">
            {this.state.apiDataRecieved ? this.renderCharacters() : ''}
            <button className="ChooseCharacter-play-button" onClick={(e) => this.handlePlayButton()}>Play</button>

            <div className="simpleModal">
              <div className="modalContent">
                <span className="closeButton" onClick={(e) => this.closeModal()}>&times;</span>
                <h1 className="modalHeading">Create Character</h1>
                <br></br>
                <br></br>
                <CreateCharacter userData={this.state.userData} createCharacter={this.createCharacter} />
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
};

export default ChooseCharacter;
