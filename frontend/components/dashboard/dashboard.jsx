import React from "react";
import { Redirect } from "react-router-dom";


class Dashboard extends React.Component {

  render() {
    if (!this.props.logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div className="dashboard">
          <h1>Hey guy, you're at the dashboard</h1>
      </div>
    );
  }

};

export default Dashboard;
