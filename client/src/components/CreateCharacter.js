import React, { Component } from 'react';
import services from '../services/apiServices';
import {Redirect} from 'react-router-dom';

class CreateCharacter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,
      fireRedirect: false,
      userData: this.props.userData
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.userData);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      user_id: this.state.userData,
      name: this.state.name,
      class_id: this.state.class_id,
      experience: 0,
      level: 1
    }
    services.createCharacter(data)
      .then(result => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return(
      <div className="CreateCharacter">
        <form className="CreateCharacter-form" onSubmit={this.handleSubmit}>
          <input className="CreateCharacter-input-name" type="text" name="name" onChange={this.handleChange} placeholder="Character Name" />
          <br></br>
          <br></br>
          <br></br>
          <label>
            <input className="CreateCharacter-input-class" type="radio" name="class_id" value="1" onChange={this.handleChange} />
            Knight
          </label>
          <label>
            <input className="CreateCharacter-input-class" type="radio" name="class_id" value="2" onChange={this.handleChange} />
            Wizard
          </label>
          <label>
            <input className="CreateCharacter-input-class" type="radio" name="class_id" value="3" onChange={this.handleChange} />
            Archer
          </label>
          <br></br>
          <br></br>
          <input className="CreateCharacter-input-submit" type="submit" value="Create" />
        </form>
      </div>
    );
  }
};

export default CreateCharacter;
