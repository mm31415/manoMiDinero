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
    this.handleState = this.handleState.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.bill) {
      let friendId;
      if (this.props.bill.splits[0].user_id === this.props.currentUserId) {
        friendId = this.props.bill.splits[1].user_id;
      } else {
        friendId = this.props.bill.splits[0].user_id;
      }
      if (prevProps.bill !== this.props.bill) {
        this.setState({
          bill: merge({}, this.props.bill, { amount: parseFloat(this.props.bill.amount).toFixed(2) }),
          friend: {
            id: friendId,
            name: this.props.friends_obj[friendId].name
          }
        });
      }
    }
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
      { user_id: this.props.currentUserId, amount: amount1 },
      { user_id: this.state.friend.id, amount: amount2 }
    ];
    const newState = merge({}, this.state,
      { bill: {
        splits: splits
      }});
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

  handleState(e) {
    const defaultBillState = {
      bill: {
        amount: '',
        description: '',
        date: '',
        payer_id: this.props.currentUserId,
        splits: []
      },
      friend: { id: null, name: '' }
    };
    this.setState(defaultBillState);
  }

  handleSubmit(closeModal) {
    return (e => {
      e.preventDefault();
      if (this.checkValidations()) {
        const bill = this.state.bill;
        const friend = this.state.friend;
        bill.amount = bill.amount - 0;
        if (this.props.formType !== "addBill") {
          this.props.updateBill(bill);
        } else {
          this.props.addBill(bill, friend);
        }
        closeModal(e);
      }
    });
  }

  render() {
    const modal = document.getElementById("add-bill-modal");
    const modalForm = document.getElementById("add-bill-form");
    const searchBox = document.getElementById("friend-search");
    const fadeOut = (e) => {
      if (e.target === modal) {
        this.handleState();
        this.props.removeEditBillId();
        document.getElementById("datepicker").value = "";
        searchBox.style.display = "none";
        modalForm.classList.toggle("fade-out");
        setTimeout(function() {
          modal.style.display = "none";
        }, 400);
        setTimeout(function() {
          modalForm.classList.remove("fade-out");
        }, 500);
      }
    };

    const closeModal = e => {
      e.preventDefault();
      this.props.removeEditBillId();
      this.handleState();
      document.getElementById("datepicker").value = "";
      searchBox.style.display = "none";
      modalForm.classList.toggle("fade-out");
      setTimeout(function() {
        modal.style.display = "none";
      }, 400);
      setTimeout(function() {
        modalForm.classList.remove("fade-out");
      }, 500);
    };

    const selectOptions = this.props.friends_arr.map((friend) => {
      return <SelectFriendItem key={friend.id} friend={friend} setFriend={this.setFriend} />;
    });

    const updateList = (e) => {
      this.updateField("name")(e);
      if (e.currentTarget.value === "") {
        searchBox.style.display = "none";
        return false;
      }

      searchBox.style.display = "initial";
      const searchTerm = e.currentTarget.value.toLowerCase();
      const list = document.getElementsByClassName("name-li");
      for (let i = 0; i < list.length; i++) {
        if (!list[i].attributes.label.value.toLowerCase().includes(searchTerm)) {
          list[i].style.display = "none";
        } else {
          list[i].style.display = "flex";
        }
      }
    };

    return(
      <div id={"add-bill-modal"} onClick={fadeOut}>
        <form id={"add-bill-form"}>
          <header id="add-bill-header">
            {this.props.formType === "addBill" ? "Add Bill" : "Edit Bill"}
            <button className="close-btn" onClick={closeModal}>
              <i className="fa fa-close"></i></button>
          </header>

          <span id="enter-name">
            <h1>With <em>you</em> and:</h1>
            <input type="hidden" className="friend-value"></input>
            <input type="text" placeholder="Friend Name"
              value={this.state.friend.name}
              onChange={updateList}></input>
          </span>

          <ul id="friend-search">
            {selectOptions}
          </ul>

          <span id="description-amount">
            <img src={window.staticImages.bill} />
            <ul id="bill-inputs">
              <li>
                &nbsp;<input type="text" value={this.state.bill.description}
                  onChange={this.updateField("description")}
                  placeholder="Enter a description"></input>
              </li>
              <li>
                $<input type="text" value={this.state.bill.amount}
                  onChange={this.updateField("amount")}
                  onBlur={this.displayAmount} placeholder="0.00"></input>
              </li>
            </ul>
          </span>

          <span id="dynamic-info">
            <h1>Paid by&nbsp;<button className="change-payer-btn" onClick={this.changePayer}>{this.displayPayer()}</button>&nbsp;and split equally.</h1>
            <h1>(${`${(this.state.bill.amount / 2).toFixed(2)}`}/person)</h1>
          </span>

          <span id="date-submit">
          <input type="date" id="datepicker"
            onChange={this.updateField("date")} value={this.state.bill.date}></input>
          <button id="add-bill-btn" onClick={this.handleSubmit(closeModal)} onMouseOver={this.addSplits}>Save Bill</button>
          </span>
        </form>
      </div>
    );
  }

}

export default BillModal;
