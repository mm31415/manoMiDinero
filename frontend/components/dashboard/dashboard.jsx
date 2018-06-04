import React from "react";
import { Redirect } from "react-router-dom";


class Dashboard extends React.Component {

  render() {
    if (!this.props.logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div className="dashboard">
        <ul id="balances">
          <li>
            <h1>total balance</h1>
          </li>
          <li>
            <h1>you owe</h1>
          </li><li>
            <h1>you are owed</h1>
          </li>
        </ul>
      </div>
    );
  }

};

export default Dashboard;
