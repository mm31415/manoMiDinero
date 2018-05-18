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

  setFriend (e, friendUlChild) {
    if (e.which === 13) {
      const newState = merge({}, this.state,
        { bill: { payer_id: this.props.currentUserId } },
        { friend: {
          id: parseInt(friendUlChild.value),
          name: this.props.friends_obj[parseInt(friendUlChild.value)].name
        }});
      this.setState(newState);
    } else {
      const newState = merge({}, this.state,
        { bill: { payer_id: this.props.currentUserId } },
        { friend: {
          id: parseInt(e.currentTarget.value),
          name: this.props.friends_obj[parseInt(e.currentTarget.value)].name
        }});
      this.setState(newState);
    }
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
        bill.amount = bill.amount - 0;
        this.props.action(bill);
        closeModal(e);
      }
    });
  }

  hideSearch (e) {
    const searchBox = document.getElementById("friend-search");
    searchBox.style.display = "none";
  }

  render() {

    const modal = document.getElementById("add-bill-modal");
    const modalForm = document.getElementById("add-bill-form");
    const searchBox = document.getElementById("friend-search");
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
      let friendUlChild = document.getElementById("friend-search").firstChild;
      while (true) {
        if (friendUlChild === null) {
          break;
        } else if (friendUlChild.style.display === "none") {
          friendUlChild.style.removeProperty("background");
          friendUlChild = friendUlChild.nextSibling;
          continue;
        }
        break;
      }
      if (friendUlChild !== null) {
        friendUlChild.style.background = "lightgray";
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

    const handleKeyPress = (e) => {
      let friendUlChild = document.getElementById("friend-search").firstChild;
      if (e.which === 13) {
        e.preventDefault();
        while (true) {
          if (friendUlChild === null) {
            break;
          } else if (friendUlChild.style.background === "lightgray") {
            this.setFriend(e, friendUlChild);
            this.hideSearch(e);
            break;
          } else {
            friendUlChild = friendUlChild.nextSibling;
            continue;
          }
        }
      } else if (e.which === 8) {
        while (true) {
          if (friendUlChild === null) {
            break;
          } else {
            friendUlChild.style.removeProperty("background");
            friendUlChild = friendUlChild.nextSibling;
            continue;
          }
        }
      } else if (e.which === 40) {
        e.preventDefault();
        while (true) {
          if (friendUlChild === null) {
            break;
          } else if (friendUlChild.style.background === "lightgray") {
            let nextUlChild = friendUlChild.nextSibling;
            if (nextUlChild !== null && nextUlChild.style.display !== "none") {
              friendUlChild.style.removeProperty("background");
              nextUlChild.style.background = "lightgray";
            }
            break;
          } else {
            friendUlChild = friendUlChild.nextSibling;
            continue;
          }
        }
      } else if (e.which === 38) {
        e.preventDefault();
        while (true) {
          if (friendUlChild === null) {
            break;
          } else if (friendUlChild.style.background === "lightgray") {
            let previousUlChild = friendUlChild.previousSibling;
            if (previousUlChild !== null && previousUlChild.style.display !== "none") {
              friendUlChild.style.removeProperty("background");
              previousUlChild.style.background = "lightgray";
            }
            break;
          } else {
            friendUlChild = friendUlChild.nextSibling;
            continue;
          }
        }
      }
    };

    // const toggleId = (e) => {
    //   debugger
    //   const friendSearchChange = document.getElementById("friend-search");
    //   friendSearchChange.removeAttribute("id");
    //   friendSearchChange.addAttribute("id", "friend-search-focus");
    // };

    return(
      <div id="add-bill-modal" onClick={fadeOut}>
        <form id="add-bill-form">
          <header id="add-bill-header">
            Add Bill<button id="close-btn" onClick={closeModal}><i className="fa fa-close"></i></button>
          </header>

          <span id="enter-name">
            <h1>With <em>you</em> and:</h1>
            <input type="hidden" id="friend-value"></input>
            <input type="text" placeholder="Friend Name"
              value={this.state.friend.name}
              onChange={updateList} onKeyDown={handleKeyPress} ></input>
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
            <h1>Paid by&nbsp;<button id="change-payer-btn" onClick={this.changePayer}>{`${this.displayPayer()}`}</button>&nbsp;and split equally.</h1>
            <h1>(${`${(this.state.bill.amount / 2).toFixed(2)}`}/person)</h1>
          </span>

          <span id="date-submit">
          <input type="date" id="datepicker"
            onBlur={this.updateField("date")}></input>
          <button id="add-bill-btn" onClick={this.handleSubmit(closeModal)} onMouseOver={this.addSplits}>Add Bill</button>
          </span>
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
