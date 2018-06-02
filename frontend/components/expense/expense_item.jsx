import React from "react";
import { Link } from "react-router-dom";

const MONTHS = {
  "01": "JAN", "02": "FEB", "03": "MAR",
  "04": "APR", "05": "MAY", "06": "JUN",
  "07": "JUL", "08": "AUG", "09": "SEP",
  "10": "OCT", "11": "NOV", "12": "DEC"
};

const dateParse = (dateArr) => {
  return {
    year: dateArr[0],
    month: MONTHS[dateArr[1]],
    day: dateArr[2]
  };
};

const oweInfo = (props) => {
  if (props.payee.name === "you") {
    return (
      <li id="owe-li">
        <h1>you lent {props.ower.name.toLowerCase()}</h1>
        <div id="lender">${parseFloat(props.ower.amount).toFixed(2)}</div>
      </li>
    );
  } else {
    return (
      <li id="owe-li">
        <h1>{props.payee.name.toLowerCase()} lent you</h1>
        <div id="ower">${parseFloat(props.ower.amount).toFixed(2)}</div>
      </li>
    );
  }
};

export const ExpenseItem = (props) => {

  const deleteExpense = (expense) => {
    return (
      e => {
        e.preventDefault();
        props.deleteBill(expense.id)
      }
    );
  };

  const handleEditBill = (e) => {
    if (e.target.className !== "fa fa-close") {
      props.addEditBillId(e.currentTarget.value);
      const modalForm = document.getElementById("add-bill-form");
      const modal = document.getElementById("add-bill-modal");
      modal.style.display = "block";
      modalForm.classList.add("fade-in");
    }
  };

  const date = dateParse(props.expense.date.split("-"));

  if (props.expense.payee_id) {
    return <li>This is where payment goes</li>;
  } else {
    return (
      <li id="expense-item" value={props.expense.id} onClick={handleEditBill} >
        <div id="expense-item-left">
          <ul id="bill-date">
            <li id="month">{date.month}</li>
            <li id="day">{date.day}</li>
          </ul>
          <img src={window.staticImages.bill} />
          <h1 id="description">{props.expense.description}</h1>
        </div>
        <ul id="expense-item-right">
          <li id="paid-li">
            <h1>{props.payee.name.toLowerCase()} paid</h1>
            <div id="paid">${parseFloat(props.expense.amount).toFixed(2)}</div>
          </li>
          {oweInfo(props)}
          <Link to="/" id="delete-expense-btn" onClick={deleteExpense(props.expense)}><i className="fa fa-close"></i></Link>
        </ul>
      </li>
    );
  }

};
