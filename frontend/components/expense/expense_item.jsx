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
  if (props.payer.name === "you") {
    return (
      <li id="owe-li">
        <h1>you lent {props.ower.name.toLowerCase()}</h1>
        <div id="lender">${parseFloat(props.ower.amount).toFixed(2)}</div>
      </li>
    );
  } else {
    return (
      <li id="owe-li">
        <h1>{props.payer.name.toLowerCase()} lent you</h1>
        <div id="ower">${parseFloat(props.ower.amount).toFixed(2)}</div>
      </li>
    );
  }
};

export const ExpenseItem = (props) => {

  const deleteExpense = (bill) => {
    return (
      e => {
        e.preventDefault();
        props.deleteBill(bill.id)
      }
    );
  };

  const handleEditBill = (e) => {
    if (e.target.className !== "fa fa-close") {
      props.addEditBillId(e.currentTarget.value);
      const modal_form = document.getElementById("add-bill-form");
      const modal = document.getElementById("add-bill-modal");
      modal.style.display = "block";
      modal_form.classList.add("fade-in");
    }
  };

  const date = dateParse(props.bill.date.split("-"));

  return (
    <li id="expense-item" value={props.bill.id} onClick={handleEditBill} >
      <div id="expense-item-left">
        <ul id="bill-date">
          <li id="month">{date.month}</li>
          <li id="day">{date.day}</li>
        </ul>
        <img src={window.staticImages.bill} />
        <h1 id="description">{props.bill.description}</h1>
      </div>
      <ul id="expense-item-right">
        <li id="paid-li">
          <h1>{props.payer.name.toLowerCase()} paid</h1>
          <div id="paid">${parseFloat(props.bill.amount).toFixed(2)}</div>
        </li>
        {oweInfo(props)}
        <Link to="/" id="delete-expense-btn" onClick={deleteExpense(props.bill)}><i className="fa fa-close"></i></Link>
      </ul>
    </li>
  );
};
