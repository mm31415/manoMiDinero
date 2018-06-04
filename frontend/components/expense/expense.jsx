import React from "react";
import { Redirect } from "react-router-dom";
import { ExpenseItem } from "./expense_item";

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

export const Expense = (props) => {
    if (!props.logged_in) {
      return <Redirect to="/" />;
    }

    const payeeInfo = (expense, secondUser) => {
      if (expense.payee_id) {
        if (expense.payee_id === props.logged_in) {
          return {
            name: "you",
            id: props.logged_in
          };
        } else {
          return secondUser;
        }
      } else if (expense.splits) {
        if (expense.payer_id === props.logged_in) {
          return {
            name: "you",
            id: props.logged_in
          };
        } else {
          return secondUser;
        }
      }
    };

    const owerInfo = (expense, payee, secondUser) => {
      let amount;
      if (expense.payee_id) {
        amount = expense.amount;
      } else if (expense.splits) {
        if (expense.splits[0].user_id === payee.id) {
          amount = expense.splits[1].amount;
        } else {
          amount = expense.splits[0].amount;
        }
      }
      if (amount) {
        if (payee.id !== props.logged_in) {
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
      }
    };

    const otherUser = (expense) => {
      let otherUserId;
      if (expense.payee_id) {
        if (expense.payee_id === props.logged_in) {
          otherUserId = expense.payer_id;
        } else {
          otherUserId = expense.payee_id;
        }
      } else if (expense.splits) {
        if (expense.splits[0].user_id === props.logged_in) {
          otherUserId = expense.splits[1].user_id;
        } else {
          otherUserId = expense.splits[0].user_id;
        }
      }
      return props.users[otherUserId];
    };

    // const expenseItems = props.expenses.map((expense) => {
    //   const secondUser = otherUser(expense);
    //   const payee = payeeInfo(expense, secondUser);
    //   const ower = owerInfo(expense, payee, secondUser);
    //   return <ExpenseItem key={expense.id} expense={expense} payee={payee}
    //     ower={ower}  deleteBill={props.deleteBill}
    //     addEditBillId={props.addEditBillId}
    //     removeEditBillId={props.removeEditBillId} />;
    // });

    const expenseItems = [];
    for (let i = 0; i < props.expenses.length; i++) {
      const secondUser = otherUser(props.expenses[i]);
      const payee = payeeInfo(props.expenses[i], secondUser);
      const ower = owerInfo(props.expenses[i], payee, secondUser);
      const date = dateParse(props.expenses[i].date.split('-'));
      if (i === 0) {
        expenseItems.push(
          <li id="month-li" key={i}>
            <h1>{date.month}&nbsp;{date.year}</h1>
          </li>
        );
      }
      expenseItems.push(
        <ExpenseItem key={props.expenses[i].id} expense={props.expenses[i]}
          payee={payee} ower={ower}  deleteBill={props.deleteBill}
          addEditBillId={props.addEditBillId}
          removeEditBillId={props.removeEditBillId} />
      );
      if (i + 1 < props.expenses.length) {
        const nextDate = dateParse(props.expenses[i + 1].date.split('-'));
        if (date.month !== nextDate.month || date.year !== nextDate.year) {
          expenseItems.push(
            <li id="month-li" key={i+1}>
              <h1>{nextDate.month}&nbsp;{nextDate.year}</h1>
            </li>
          );
        }
      }
    }

    const emptyPage = () => {
      if (props.expenses.length < 1) {
        return (
          <div id="empty-page">
            <img src={window.staticImages.empty} />
            <ul>
              <h1>You have not added any expenses yet</h1>
              <h2>To add a new expense, click the orange “Add Bill” button.</h2>
            </ul>
          </div>
        );
      }
    };

    return (
      <div className="all-expenses">
        {emptyPage()}
        <ul id="epense-list">
          {expenseItems}
        </ul>
      </div>
    );

};
