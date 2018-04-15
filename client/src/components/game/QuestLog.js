import React, { Component } from 'react';
import services from '../../services/apiServices';

class QuestLog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,

      questLog: null,

      characterInfo: null,
      character_id: this.props.character_id
    }
  }

  componentDidMount() {
    let data = {
      character_id: this.state.character_id
    }

    services.getCharacterInfo(this.state.character_id)
      .then(result => {
        this.setState({
          characterInfo: result.data.data
        })
        services.getQuestLog(data)
          .then(result => {
            this.setState({
              questLog: result.data.data
            })
            services.getQuestInfo(data)
              .then(result => {
                this.setState({
                  apiData: result.data.data,
                  apiDataRecieved: true
                })
              })
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderQuestLog() {
    let QuestLog = this.state.apiData.map((el, idx) => {
      console.log("Map Function QuestLog", el);
      console.log("Requirements", this.state.questLog[0].requirements);
      return(
        <div className="QuestLog-contents" key={idx}>
          <h1>{el.quest_name}</h1>
          <h3>{el.quest_obj}</h3>
          <h3>Requirements Met: {this.state.questLog[0].requirements} / {el.requirements}</h3>
        </div>
      );
    })

    return(
      <div className="QuestLog-container">
        <div className="QuestLog-contents-container">
          {QuestLog}
        </div>
      </div>
    );
  }

  render() {
    return(
      <div className="QuestLog">
        {this.state.apiDataRecieved ? this.renderQuestLog() : ''}
      </div>
    );
  }
};

export default QuestLog;
