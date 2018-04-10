import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import services from '../services/apiServices';

class ChooseCharacter extends Component {

  constructor(props) {
    super(props);
    this.state ={
      userData: this.props.userData,
      apiData: null,
      apiDataRecieved: false,
      createCharacterRedirect: false
    }
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
        <div className={`ChooseCharacter-characterList-contents-characters character-${idx}`} key={idx} onClick={(e) => this.handleCharacterSelection(idx)}>
          <div className="ChooseCharacter-characterList-contents-characters-text">
            <h3>{el.name}</h3>
            <h3>Level: {el.level} {class_name}</h3>
          </div>
        </div>
      );
    })

    return(
      <div className="ChooseCharacter-characterList">
        <div className="ChooseCharacter-characterList-header-container">
          <h1 className="ChooseCharacter-characterList-header">Characters</h1>
        </div>
        <div className="ChooseCharacter-characterList-container">
          <div className="ChooseCharacter-characterList-contents">
            {CharacterNames}
          </div>
        </div>
        <button className="ChooseCharacter-create-character-button" onClick={(e) => this.handleCreateCharacterButton()}>Create Character</button>
      </div>
    );

  }

  handleCreateCharacterButton() {
    this.setState({
      createCharacterRedirect: true
    })
  }

  handleCharacterSelection(id) {
    console.log(id);
    let button = document.querySelector(`.character-${id}`);
    if(button.style.backgroundColor === "#333333") {
      console.log("True");
      button.style.backgroundColor = "#1a1a1a"
    }else {
      console.log("False");
      button.style.backgroundColor = "#333333"
    }
  }

  handlePlayButton() {

  }

  render() {
    return(
      <div className="ChooseCharacter">
        {this.state.apiDataRecieved ? this.renderCharacters() : ''}
        <button className="ChooseCharacter-play-button" onClick={(e) => this.handlePlayButton()}>Play</button>
        {this.state.createCharacterRedirect ? <Redirect to="/CreateCharacter" /> : ''}
      </div>
    );
  }
};

export default ChooseCharacter;
