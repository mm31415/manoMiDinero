import React from "react";
import { Redirect } from "react-router-dom";
import { ExpenseItem } from "./expense_item";

export const Expense = (props) => {
    if (!props.logged_in) {
      return <Redirect to="/" />;
    }

    const payerInfo = (bill, secondUser) => {
      if (bill.payerId === props.logged_in) {
        return {
          name: "you",
          id: props.logged_in
        };
      } else {
        return secondUser;
      }
    };

    const owerInfo = (bill, payer, secondUser) => {
      let amount;
      if (bill.splits[0].user_id === payer.id) {
        amount = bill.splits[1].amount;
      } else {
        amount = bill.splits[0].amount;
      }
      if (payer.id !== props.logged_in) {
        return {
          name: "you",
          amount: amount
        };
      } else {
        return {
          name: secondUser.name,
          amount: amount
        }
      }
    };

    const otherUser = (bill) => {
      let otherUserId;
      if (bill.splits[0].user_id === props.logged_in) {
        otherUserId = bill.splits[1].user_id;
      } else {
        otherUserId = bill.splits[0].user_id;
      }
      return props.users[otherUserId];
    };

    const expenseItems = props.bills.map((bill) => {
      const secondUser = otherUser(bill);
      const payer = payerInfo(bill, secondUser);
      const ower = owerInfo(bill, payer, secondUser);
      return <ExpenseItem key={bill.id} bill={bill} payer={payer}
        ower={ower} />;
    });

    return (
      <div className="all-expenses">
        <ul id="epense-list">
          {expenseItems}
        </ul>
      </div>
    );

};
