import React from "react";

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
      <li>
        <h1>you lent {props.ower.name.toLowerCase()}</h1>
        <div id="lender">${props.ower.amount}</div>
      </li>
    );
  } else {
    return (
      <li>
        <h1>{props.payer.name.toLowerCase()} lent you</h1>
        <div id="ower">${props.ower.amount}</div>
      </li>
    );
  }
};

export const ExpenseItem = (props) => {
  const date = dateParse(props.bill.date.split("-"));
  return (
    <li id="expense-item">
      <div id="expense-item-left">
        <ul id="bill-date">
          <li id="month">{date.month}</li>
          <li id="day">{date.day}</li>
        </ul>
        <img src={window.staticImages.bill} />
        <h1>{props.bill.description}</h1>
      </div>
      <ul id="expense-item-right">
        <li>
          <h1>{props.payer.name.toLowerCase()} paid</h1>
          <div id="paid">${props.bill.amount}</div>
        </li>
        {oweInfo(props)}
      </ul>
    </li>
  );
};
