import React from "react";
import { SelectFriendItem } from "./select_friend_item";
import merge from "lodash/merge";





class BillModal extends React.Component {
  constructor(props) {
    super(props);
    const defaultBillState = {
      bill: {
        amount: '',
        description: '',
        date: '',
        payer_id: props.currentUserId,
        splits: []
      },
      friend: { id: null, name: '' }
    };
    this.state = props.bill || defaultBillState;
    this.setFriend =  this.setFriend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.displayAmount = this.displayAmount.bind(this);
    this.displayPayer = this.displayPayer.bind(this);
    this.changePayer = this.changePayer.bind(this);
    this.addSplits = this.addSplits.bind(this);
    this.checkValidations = this.checkValidations.bind(this);
  }



  updateField (field) {
    const that = this;
    if (field === "name") {
      return (
        e => {
          const newState = merge({}, that.state, { friend: { id: null, [field]: e.currentTarget.value } });
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
    const newState = merge({}, this.state,
      { bill: { payer_id: this.props.currentUserId } },
      { friend: {
        id: parseInt(e.currentTarget.value),
        name: this.props.friends_obj[parseInt(e.currentTarget.value)].name
      }});
    this.setState(newState);
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

  displayPayer (e) {
    if (this.state.bill.payer_id === this.state.friend.id) {
      return `${this.state.friend.name}`;
    } else {
      return "you";
    }
  }

  changePayer (e) {
    e.preventDefault();
    let newState;
    if (this.state.bill.payer_id === this.state.friend.id) {
      newState = merge({}, this.state, { bill: { payer_id: this.props.currentUserId } });
    } else {
      newState = merge({}, this.state, { bill: { payer_id: this.state.friend.id || this.props.currentUserId } });
    }
    this.setState(newState);
  }

  addSplits() {
    const amount1 = this.state.bill.amount - (this.state.bill.amount / 2).toFixed(2);
    const amount2 = this.state.bill.amount - amount1;
    const splits = [
      { [this.props.currentUserId]: amount1 },
      { [this.state.friend.id]: amount2 }
    ];
    const newState = merge({}, this.state,
      { bill: {
        splits: splits
      }});
      debugger
    this.setState(newState);
  }

  checkValidations() {
    if (!this.state.friend.id) {
      alert("Add a friend");
      return false;
    } else if (this.state.bill.description === "") {
      alert("Add a description");
      return false;
    } else if (this.state.bill.amount === "" || this.state.bill.amount === "0.00"  ) {
      alert("Add an amount");
      return false;
    } else if (this.state.bill.date === "") {
      alert("Add a date");
      return false;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.checkValidations()) {
      console.log(this.state);
    }
    console.log(this.state);
  }

  render() {

    const selectOptions = this.props.friends_arr.map((friend) => {
      return <SelectFriendItem key={friend.id} friend={friend} setFriend={this.setFriend} />;
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

          Paid by<button onClick={this.changePayer}>{`${this.displayPayer()}`}</button>and split equally.

          <button onClick={this.handleSubmit} onMouseOver={this.addSplits}>Add Bill</button>
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
