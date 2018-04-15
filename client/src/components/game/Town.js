import React, { Component } from 'react';
import services from '../../services/apiServices';

class Town extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,

      questLog: null,
      questLogFull: false,

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
        console.log(err);
      })

      services.getQuests()
        .then(result => {
          console.log("Quest Data", result.data.data);
          this.setState({
            apiData: result.data.data,
            apiDataRecieved: true
          })
        })
        .catch(err => {
          console.log(err);
        })

        let data = {
            character_id: this.state.character_id
        }

        services.getQuestLog(data)
          .then(result => {
            console.log("Quest Log in Town", result);
            this.setState({
              questLog: result.data.data
            })
          })
          .catch(err => {
            console.log(err);
          })
  }

  renderNoticeBoard() {
    let NoticeBoard = this.state.apiData.map((el, idx) => {
      console.log(el);
      return(
        <div className="Town-noticeBoard-contents" key={idx}>
          <h1>{el.quest_name}</h1>
          <h3>{el.quest_obj}</h3>
          <h3>Requirements: {el.requirements}</h3>
          <button className="Town-noticeBoard-contents-acceptQuest" onClick={(e) => this.handleAcceptQuest(el.quest_id)}>Accept Quest</button>
        </div>
      );
    })

    return(
      <div className="Town-noticeBoard-container">
        <div className="Town-noticeBoard-contents-Container">
          {NoticeBoard}
        </div>
      </div>
    );
  }

  handleAcceptQuest(id) {
    if(Array.isArray(this.state.questLog)) {
      this.setState({
        questLogFull: true
      }, () => {
        setTimeout(() => {
          this.setState({
            questLogFull: false
          })
        }, 2000)
      })
    }else {
      let data = {
        quest_id: id,
        character_id: this.state.character_id,
        requirements: 0
      }
      services.addQuest(data)
        .then(result => {
          console.log("Adding quest", result)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  renderQuestLogFull() {
    return(
      <div className="Town-questLogFull">
        <h1 className="Town-questLogFull-h1">Can't accept quest, Quest Log is full</h1>
      </div>
    );
  }

  render() {
    return(
      <div className="Town">
        <button onClick={this.props.triggerGame}>Back to Game</button>
        {this.state.apiDataRecieved ? this.renderNoticeBoard() : ''}
        {this.state.questLogFull ? this.renderQuestLogFull() : ''}
      </div>
    );
  }
};

export default Town;
