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
//
// const payerInfo = (props) => {
//   if (props.bill.payerId === props.users[0].id) {
//     return props.users[0];
//   } else {
//     return props.users[1];
//   }
// };
//
// const owerInfo = (props) => {
//   if (props.bill.payerId === props.users[0].id) {
//     let amount;
//     if (props.bill.splits[0].user_id === props.users[1].id) {
//       amount = props.bill.splits[0].amount;
//     } else {
//       amount = props.bill.splits[1].amount;
//     }
//     return {
//       name: props.users[1].name,
//       amount: amount
//     };
//   } else {
//     let amount;
//     if (props.bill.splits[0].user_id === props.users[0].id) {
//       amount = props.bill.splits[0].amount;
//     } else {
//       amount = props.bill.splits[1].amount;
//     }
//     return {
//       name: props.users[0].name,
//       amount: amount
//     };
//   }
// };

export const ExpenseItem = (props) => {
  const date = dateParse(props.bill.date.split("-"));
  return (
    <li id="expense-item">
      <div id="expense-item-left">
        <ul id="bill-date">
          <li>{date.month}</li>
          <li>{date.day}</li>
        </ul>
        <img src={window.staticImages.bill} />
        <h1>{props.bill.description}</h1>
      </div>
      <ul id="expense-item-right">
        <li>
          <div>{props.payer.name} paid</div>
          <div>${props.bill.amount}</div>
        </li>
        <li>
          <div>{props.ower.name} borrowed</div>
          <div>${props.ower.amount}</div>
        </li>
      </ul>
    </li>
  );
};
