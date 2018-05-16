import React from "react";
import { Redirect } from "react-router-dom";

class Expense extends React.Component {
  
  render() {
    if (!this.props.logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div className="all-expenses">
        <h1>Hey guy, you're at the expense dash</h1>
      </div>
    );
  }

};

export default Expense;
