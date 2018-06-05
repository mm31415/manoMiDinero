import React from "react";
import { Redirect } from "react-router-dom";
import { balance } from "../../util/function_util";


export const Dashboard = (props) => {

  if (!props.logged_in) {
    return <Redirect to="/" />;
  }

  const handleClick = (e, props) => {
    props.history.push(`/main/friends/${e.currentTarget.value}`);
  };

  const emptyPage = (props) => {
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
    return <h2 id="lender">${Math.abs(amount).toFixed(2)}</h2>;
  };

  const listItem = (amount, friendName, friendId) => {
    if (amount < 0) {
      return (
        <li key={friendId} value={friendId}
          onClick={(e) => handleClick(e, props)}>
          <img src={window.staticImages.avatar}></img>
          <div>
            <h1>{friendName}</h1>
            <h2 id="ower">you owe <em>${(amount * -1).toFixed(2)}</em></h2>
          </div>
        </li>
      );
    } else {
      return (
        <li key={friendId} value={friendId}
          onClick={(e) => handleClick(e, props)}>
          <img src={window.staticImages.avatar}></img>
          <div>
            <h1>{friendName}</h1>
            <h2 id="lender">owes you <em>${amount.toFixed(2)}</em></h2>
          </div>
        </li>
      );
    }
  };

  const dashList = (props) => {
    const oweInfo = [];
    const lenderInfo = [];
    props.friendIds.forEach((id) => {
      const amount = balance(props.friendExpenses[id], props.logged_in);
      if (amount < 0) {
        oweInfo.push(listItem(amount, props.users[id].name, id));
      } else if (amount > 0) {
        lenderInfo.push(listItem(amount, props.users[id].name, id));
      }
    });
    return (
      <div id="dash-list" className="show-dash-list-div">
        <ul id="owe-list">
          {oweInfo}
        </ul>
        <ul id="lender-list">
          {lenderInfo}
        </ul>
      </div>
    );
  };

  const chartItem = (amount, friendName, friendId) => {
    let liStyle = {};
    let width;
    if (amount < 0) {
      width = parseInt(amount * -1);
      if (width < 50) {
        liStyle = { width: '50px' };
      } else {
        liStyle = { width: `${width}px` };
      }
      return (
        <li id="ower-chart-li" key={friendId}
          value={friendId} style={liStyle}
          onClick={(e) => handleClick(e, props)}>
          <div>
            <h1>{friendName}</h1>
            <h2>${(amount * -1).toFixed(2)}</h2>
          </div>
        </li>
      );
    } else {
      width = parseInt(amount);
      if (width < 50) {
        liStyle = { width: '50px' };
      } else {
        liStyle = { width: `${width}px` };
      }

      return (
        <li id="lender-chart-li" key={friendId}
          value={friendId} style={liStyle}
          onClick={(e) => handleClick(e, props)}>
          <div>
            <h1>{friendName}</h1>
            <h2>${amount.toFixed(2)}</h2>
          </div>
        </li>
      );
    }
  };

  const dashChart = (props) => {
    const oweInfo = [];
    const lenderInfo = [];
    props.friendIds.forEach((id) => {
      const amount = balance(props.friendExpenses[id], props.logged_in);
      if (amount < 0) {
        oweInfo.push(chartItem(amount, props.users[id].name, id));
      } else if (amount > 0) {
        lenderInfo.push(chartItem(amount, props.users[id].name, id));
      }
    });
    return (
      <div id="dash-chart" className="hide-dash-chart-div">
        <ul id="owe-chart">
          {oweInfo}
        </ul>
        <ul id="lender-chart">
          {lenderInfo}
        </ul>
      </div>
    );
  };

  const handleDashView = (e) => {
    if (e.currentTarget.id === "view-list") {
      if (e.currentTarget.className !== "show-dash-list") {
        e.currentTarget.nextSibling.className = "hide-dash-chart";
        e.currentTarget.className = "show-dash-list";
        document.getElementById("dash-list").className = "show-dash-list-div";
        document.getElementById("dash-chart").className = "hide-dash-list-div";
      }
    } else {
      if (e.currentTarget.className !== "show-dash-chart") {
        e.currentTarget.previousSibling.className = "hide-dash-list";
        e.currentTarget.className = "show-dash-chart";
        document.getElementById("dash-chart").className = "show-dash-chart-div";
        document.getElementById("dash-list").className = "hide-dash-list-div";
      }
    }
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
          <li id="view-list" className="show-dash-list" onClick={handleDashView}>
            <i className="fa fa-bars"></i>
            view as list
          </li>
          <li id="view-chart" className="hide-dash-chart" onClick={handleDashView}>
            <i className="fa fa-bar-chart"></i>
            view chart
          </li>
        </ul>
        <h1 id="head-right">YOU ARE OWED</h1>
      </nav>
      {emptyPage(props)}
      {dashList(props)}
      {dashChart(props)}
    </div>
  );



};

export default Dashboard;
