import React, { Component } from 'react';
import services from '../../services/apiServices';

class Inventory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiData: null,
      apiDataRecieved: false,
      character_id: this.props.character_id,
      characterInfo: this.props.characterInfo
    }
    this.removeItem = this.removeItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    services.getInventoryByCharacterId(this.state.character_id)
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

  renderInventory() {
      console.log(this.state.apiData);
      let Inventory = this.state.apiData.map((el, idx) => {
        console.log(el.item_name);
        return(
          <ul>
            <li>
              <div className="Inventory-contents-items">
                <form onSubmit={this.removeItem}>
                  <label className="Inventory-contents-items-label">
                    You sure you want to delete {el.item_name}?
                    <input type="radio" name="entry_id" value={`${el.entry_id}`} onChange={this.handleChange} />
                  </label>
                  <input type="submit" value="Delete" />
                </form>
                <h1 className="Inventory-contents-items-name">{el.item_name}</h1>
              </div>
            </li>
          </ul>
        );
      })

      return(
        <div className="Inventory-contents">
          {Inventory}
        </div>
      );
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  removeItem(e) {
    e.preventDefault();
    let data = {
      entry_id: this.state.entry_id
    }

    services.removeItem(data)
    .then(() => {
      console.log("Removed Item");
      this.componentDidMount();
    })
    .catch(err => console.log(err))
  }

  render() {
    return(
      <div className="Inventory">
        {this.state.apiDataRecieved ? this.renderInventory() : ''}
      </div>
    );
  }
};

export default Inventory;
