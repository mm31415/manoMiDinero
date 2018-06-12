import React from "react";
import { SelectFriendItem } from "./select_friend_item";
import merge from "lodash/merge";

class PaymentModal extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      payment: { amount: '', payer_id: this.props.currentUserId, payee_id: '', date: '' },
      friend: { id: '', name: '' }
    };
    this.setFriend =  this.setFriend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateField = this.updateField.bind(this);
    this.displayAmount = this.displayAmount.bind(this);
    this.displayPayer = this.displayPayer.bind(this);
    this.changePayer = this.changePayer.bind(this);
    this.checkValidations = this.checkValidations.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  updateField (field) {
    const that = this;
    if (field === "name") {
      return (
        e => {
          const newState = merge({}, that.state, { friend: { id: null, [field]: e.currentTarget.value } });
          that.setState(newState);
        }
      );
    } else if (field === "amount") {
      return (
        e => {
          const newState = merge({}, that.state, { payment: { [field]: e.currentTarget.value }  });
          that.setState(newState);
        }
      );
    } else {
      return (
        e => {
          const newState = merge({}, that.state, { payment: { [field]: e.currentTarget.value } });
          that.setState(newState);
        }
      );
    }
  }

  setFriend (e) {
    const newState = merge({}, this.state,
      { payment: {
        payer_id: this.props.currentUserId,
        payee_id: parseInt(e.currentTarget.value) || this.props.currentUserId } },
      { friend: {
        id: parseInt(e.currentTarget.value),
        name: this.props.friends_obj[parseInt(e.currentTarget.value)].name
      }}
    );
    this.setState(newState);
  }

  displayAmount (e) {
    const amount = parseFloat(this.state.payment.amount);
    let newState;
    if (amount === amount) {
      newState = merge({}, this.state, { payment: { amount: amount.toFixed(2) || "" } });
    } else {
      newState = merge({}, this.state, { payment: { amount: "" } })
    }
    this.setState(newState);
  }

  displayPayer (e) {
    if (this.state.payment.payer_id === this.state.friend.id) {
      return `${this.state.friend.name}`;
    } else {
      return "you";
    }
  }

  displayPayee (e) {
    if (this.state.payment.payee_id === this.state.friend.id) {
      return `${this.state.friend.name}`;
    } else {
      return "you";
    }
  }

  changePayer (e) {
    e.preventDefault();
    let newState;
    if (this.state.payment.payer_id === this.state.friend.id) {
      newState = merge({}, this.state, { payment: {
           payer_id: this.props.currentUserId,
           payee_id: this.state.friend.id } }
       );
    } else {
      newState = merge({}, this.state, { payment: {
        payer_id: this.state.friend.id || this.props.currentUserId,
        payee_id: this.props.currentUserId } }
      );
    }
    this.setState(newState);
  }

  checkValidations() {
    if (!this.state.friend.id) {
      alert("Add a friend");
      return false;
    } else if (this.state.payment.amount === "" || this.state.payment.amount === "0.00"  ) {
      alert("Add an amount");
      return false;
    } else if (this.state.payment.date === "") {
      alert("Add a date");
      return false;
    }
    return true;
  }

  handleState(e) {
    const defaultPaymentState = {
      payment: { amount: '', payer_id: this.props.currentUserId, payee_id: '', date: '' },
      friend: { friend_id: '', name: '' }
    };
    this.setState(defaultPaymentState);
  }

  handleSubmit(closeModal) {
    return (e => {
      e.preventDefault();
      if (this.checkValidations()) {
        const payment = this.state.payment;
        const friend = this.state.friend;
        payment.amount = payment.amount - 0;
        this.props.addPayment(payment);
        closeModal(e);
      }
    });
  }

  render() {
    const modal = document.getElementById("add-payment-modal");
    const modalForm = document.getElementById("add-payment-form");
    const searchBox = document.getElementById("payment-friend-search");
    const fadeOut = (e) => {
      if (e.target === modal) {
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
      }
    };

    const closeModal = e => {
      e.preventDefault();
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
      <div id={"add-payment-modal"} onClick={fadeOut}>
        <form id={"add-payment-form"}>
          <header id="add-payment-header">
            Settle Up
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

          <ul id="payment-friend-search">
            {selectOptions}
          </ul>

          <span id="dynamic-info">
            <h1><button className="change-payer-btn" onClick={this.changePayer}>{this.displayPayer()}</button>&nbsp;paid&nbsp;{this.displayPayee()}</h1>
          </span>

          <div id="payment-amount">
            $<input type="text" value={this.state.payment.amount}
            onChange={this.updateField("amount")}
            onBlur={this.displayAmount} placeholder="0.00"></input>
          </div>

          <span id="payment-date-submit">
          <input type="date" id="payment-datepicker"
            onChange={this.updateField("date")} value={this.state.payment.date}></input>
          <button id="add-payment-btn" onClick={this.handleSubmit(closeModal)} >Save Payment</button>
          </span>
        </form>
      </div>
    );
  }

}

export default PaymentModal;
