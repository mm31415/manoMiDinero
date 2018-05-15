import React from "react";
import { SelectFriendItem } from "./select_friend_item";
import merge from "lodash/merge";



const defaultBillState = {
  bill: {
    amount: '',
    description: '',
    date: '',
    payer_id: '',
    splits: []
  },
  friend: { id: null, name: '' }
};

class BillModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.bill || defaultBillState;
    this.setFriend =  this.setFriend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.displayAmount = this.displayAmount.bind(this);
  }

  updateField (field) {
    const that = this;
    if (field === "name") {
      return (
        e => {
          const newState = merge({}, that.state, { friend: { [field]: e.currentTarget.value } });
          that.setState({ friend: { [field]: e.currentTarget.value } });
        }
      );
    } else if (field === "amount") {
      return (
        e => {
          const newState = merge({}, that.state, { bill: { [field]: e.currentTarget.value }  });
          that.setState(newState);
        }
      );
    } else {
      return (
        e => {
          const newState = merge({}, that.state, { bill: { [field]: e.currentTarget.value } });
          that.setState(newState);
        }
      );
    }
  }

  setFriend (e) {
    this.setState({
      friend: {
        id: parseInt(e.currentTarget.value),
        name: this.props.friends_obj[parseInt(e.currentTarget.value)].name
      }
    });
  }

  displayAmount (e) {
    const amount = this.state.bill.amount;
    let newState;
    if (amount) {
      newState = merge({}, this.state, { bill: { amount: parseFloat(amount).toFixed(2) || "0.00" } });
    } else {
      newState = merge({}, this.state, { bill: { amount: "0.00" } })
    }
    this.setState(newState);
  }

  dividedAmount () {
    if (this.state.bill.amount) {
      return (this.state.bill.amount / 2).toFixed(2)
    } else {
      return "0.00";
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {

    const selectOptions = this.props.friends_arr.map((friend) => {
      return <SelectFriendItem friend={friend} setFriend={this.setFriend} />;
    });

    const updateList = (e) => {
      this.updateField("name")(e);
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

    return(
      <div id="bill-modal">
        <form id="main-bill">
          <h3>With you and:</h3>
          <input type="hidden" id="friend-value"></input>
          <input type="text" placeholder="Friend Name"
            value={this.state.friend.name} onChange={updateList}></input>

          <ul>
            {selectOptions}
          </ul>

          <input type="text" value={this.state.bill.description}
            onChange={this.updateField("description")}
            placeholder="Description"></input>

          $<input type="text" value={this.state.bill.amount}
            onChange={this.updateField("amount")}
            onBlur={this.displayAmount} placeholder="0.00"></input>

          Date:<input type="date" id="datepicker"
            onBlur={this.updateField("date")}></input>
          <p>(${`${(this.state.bill.amount / 2).toFixed(2)}`}/person)</p>

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
