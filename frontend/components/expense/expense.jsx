import React from "react";
import { Redirect } from "react-router-dom";
import { ExpenseItem } from "./expense_item";

class Expense extends React.Component {

  render() {
    if (!this.props.logged_in) {
      return <Redirect to="/" />;
    }

    const expenseItems = this.props.bills.map((bill) => {
      return <ExpenseItem key={bill.id} bill={bill} />;
    });

    return (
      <div className="all-expenses">
        <h1>Hey guy you are at the expense</h1>
        <ul>
          {expenseItems}
        </ul>
      </div>
    );
  }

};

export default Expense;
