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
  }

};

export default Dashboard;
