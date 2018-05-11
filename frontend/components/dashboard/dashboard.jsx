import React from "react";
import { Redirect } from "react-router-dom";
import NavSidebarContainer from "../nav_sidebar/nav_sidebar_container";

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.fetchFriends();
  }

  render() {
    if (!this.props.logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <nav className="nav-sidebar">
          <NavSidebarContainer />
        </nav>
        <main>
          <h1>Hey guy, you're at the dashboard</h1>
        </main>
      </div>
    );
  }

};

export default Dashboard;
