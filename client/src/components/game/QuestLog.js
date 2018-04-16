import React, { Component } from 'react';
import services from '../../services/apiServices';

//Audio Imports
import CompleteQuest from '../../public/sounds/Effects/UI/QuestComplete.mp3';

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

    services.getCharacterInfo(this.state.character_id) //Get Character Info
      .then(result => {
        this.setState({
          characterInfo: result.data.data
        })
        services.getQuestLog(data) //Then Get characters quest log
          .then(result => {
            this.setState({
              questLog: result.data.data
            })
            services.getQuestInfo(data) //Get quest info for quest name and obj
              .then(result => {
                this.setState({
                  apiData: result.data.data,
                  apiDataRecieved: true
                })
                if(this.state.questLog[0].requirements === this.state.apiData[0].requirements) {
                  let questData = {
                    entry_id: this.state.questLog[0].entry_id
                  }
                  services.completeQuest(questData)
                    .then(result => {
                      console.log("Complete Quest", result);
                    })
                    .catch(err => {
                      console.log(err);
                    })
                }else {
                }
              })
              .catch(err => {
                console.log(err);
              })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleTurnIn() {
    let data = {
      entry_id: this.state.questLog[0].entry_id
    }
    services.abandonQuest(data)
      .then(result => {
        let randNum = this.RNG(2)

        if(randNum == 1) {
          let itemReward = {
            character_id: this.state.character_id,
            item_id: this.RNG(26)
          }
          services.addItem(itemReward)
            .then(result => {
              this.playCompleteQuest();
              console.log("Item reward");
              this.componentDidMount();
            })
            .catch(err => {
              console.log(err);
            })
        }else if(randNum == 2) {
          let goldReward = {
            character_id: this.state.character_id,
            gold: this.RNG(200)
          }

          services.getGold(goldReward)
            .then(result => {
              this.playCompleteQuest();
              console.log("gold reward");
              this.componentDidMount();
            })
            .catch(err => {
              console.log(err);
            })
        }

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
          {this.state.questLog[0].iscomplete ? <button onClick={(e) => this.handleTurnIn()}>Turn In</button> : ''}
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

  RNG(int){
    let numGen = Math.floor(Math.random() * int);
    return numGen;
  }

  playCompleteQuest() {
    let sound = document.querySelector('.CompleteQuest');

    sound.currentTime = 0;
    sound.play();
  }

  render() {
    return(
      <div className="QuestLog">
        {this.state.apiDataRecieved ? this.renderQuestLog() : ''}
        <audio className="CompleteQuest" src={CompleteQuest} />
      </div>
    );
  }
};

export default QuestLog;
