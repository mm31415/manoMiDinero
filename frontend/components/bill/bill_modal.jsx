import React from "react";
import { SelectFriendItem } from "./select_friend_item";

const defaultBillState = {
  bill: {
    amount: '',
    description: '',
    date: '',
    payer_id: '',
    splits: []
  },
  friend: { id: null }
};

class BillModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.bill || defaultBillState;
    this.selectFriend =  this.selectFriend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  updateField (field) {
    if (field === "amount") {
      return e => this.setState({ bill: { [field]: parseFloat(e.currentTarget.value).toFixed(2) } });
    } else {
      return e => this.setState({ bill: { [field]: e.currentTarget.value } });
    }



  }

  selectFriend (e) {
    debugger
    this.setState({ friend: { id: parseInt(e.currentTarget.value) } });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {

    const selectOptions = this.props.friends.map((friend) => {
      return <SelectFriendItem friend={friend} selectFriend={this.selectFriend} />;
    });

    const updateList = (e) => {
      const search = e.currentTarget.value;
      const list = document.getElementsByClassName("name-li");
      for (let i = 0; i < list.length; i++) {
        if (!list[i].attributes.label.value.includes(search)) {
          list[i].style.display = "none";
        } else {
          list[i].style.display = "inherit";
        }
      }
    };

    return (
      <div id="bill-modal">
        <form id="main-bill">
          <h3>With you and: </h3>
          <input type="hidden" id="friend-value" value="" />
          <input type="text" placeholder="Friend Name" onChange={updateList} />
          <ul>
            {selectOptions}
          </ul>

          <button onClick={this.handleSubmit}>Add Bill</button>
        </form>
      </div>
    );
  }

}

export default BillModal;


// e.currentTarget.attributes.value.value
// e.currentTarget.attributes.label.value.includes("blah")
// <li onClick={this.checkValue} value="ilikeCandy" label="yoman">SomeStuff</li>

// <input type="text" value={this.state.description}
//   onChange={this.updateField("description")} placeholder="Description" />
// $<input type="text" value={this.state.amount}
//   onChange={this.updateField("amount")} placeholder="0.00"/>
