import React, { Component } from 'react';
import services from '../../services/apiServices';

class QuestLog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,

      characterInfo: null,
      character_id: this.props.character_id
    }
  }

  componentDidMount() {
    services.getCharacterInfo(this.state.character_id)
      .then(result => {
        this.setState({
          characterInfo: result.data.data
        })
      })
      .catch(err => {

      })
  }

  render() {
    return(
      <div className="QuestLog">
      </div>
    );
  }
};

export default QuestLog;
