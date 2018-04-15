import React, { Component } from 'react';
import services from '../../services/apiServices';

class Town extends Component {

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
        console.log(err);
      })

      services.getQuests()
        .then(result => {
          this.setState({
            apiData: result.data.data,
            apiDataRecieved: true
          })
        })
        .catch(err => {
          console.log(err);
        })
  }

  renderNoticeBoard() {
    let NoticeBoard = this.state.apiData.map((el, idx) => {
      return(
        <div className="Town-noticeBoard-contents">
          <h1>{el.quest_name}</h1>
          <h3>{el.quest_obj}</h3>
          <h3>Requirements: {el.requirements}</h3>
        </div>
      );
    })

    return(
      <div className="Town-noticeBoard-container">\
        {NoticeBoard}
      </div>
    );
  }

  render() {
    return(
      <div className="Town">
        <button onClick={this.props.triggerGame}>Back to Game</button>
        {this.apiDataRecieved ? this.renderNoticeBoard() : ''}
      </div>
    );
  }
};

export default Town;
