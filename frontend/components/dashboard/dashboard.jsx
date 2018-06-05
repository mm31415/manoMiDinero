import React from "react";
import { Redirect } from "react-router-dom";
import { balance } from "../../util/function_util";


export const Dashboard = (props) => {

  if (!props.logged_in) {
    return <Redirect to="/" />;
  }

  const totalBalance = () => {
    const amount = balance(props.expenses, props.logged_in);
    if (amount < 0) {
      return <h2 id="ower">- ${(amount * -1).toFixed(2)}</h2>;
    } else {
      return <h2 id="lender">+ ${amount.toFixed(2)}</h2>;
    }
  };

  const oweBalance = () => {
    const oweExpenses = [];
    for (let i = 0; i < props.expenses.length; i++) {
      const expense = props.expenses[i];
      if (expense.payee_id !== undefined && expense.payee_id !== props.logged_in) {
        oweExpenses.push(expense);
      } else if (expense.splits !== undefined && expense.payer_id !== props.logged_in) {
        oweExpenses.push(expense);
      }
    }
    let amount = balance(oweExpenses, props.logged_in);
    if (amount < 0) {
      return <h2 id="ower">${(amount * -1).toFixed(2)}</h2>;
    } else {
      return <h2 id="lender">${amount.toFixed(2)}</h2>;
    }
  };

  const lenderBalance = () => {
    const lenderExpenses = [];
    for (let i = 0; i < props.expenses.length; i++) {
      const expense = props.expenses[i];
      if (expense.payee_id !== undefined && expense.payee_id === props.logged_in) {
        lenderExpenses.push(expense);
      } else if (expense.splits !== undefined && expense.payer_id === props.logged_in) {
        lenderExpenses.push(expense);
      }
    }
    let amount = balance(lenderExpenses, props.logged_in);
    return <h2 id="lender">${amount.toFixed(2)}</h2>;
  };

  return (
    <div className="dashboard">
      <ul id="balances">
        <li>
          <h1>total balance</h1>
          {totalBalance()}
        </li>
        <li>
          <h1>you owe</h1>
          {oweBalance()}
        </li><li>
          <h1>you are owed</h1>
          {lenderBalance()}
        </li>
      </ul>
      <nav id="dashboard-nav">
        <h1 id="head-left">YOU OWE</h1>
        <ul>
          <li id="view-list">
            <i className="fa fa-bars"></i>
            view as list
          </li>
          <li id="view-chart">
            <i className="fa fa-bar-chart"></i>
            view chart
          </li>
        </ul>
        <h1 id="head-right">YOU ARE OWED</h1>
      </nav>
    </div>
  );


};

export default Dashboard;
