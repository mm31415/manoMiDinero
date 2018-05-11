import React from "react";
import { Redirect } from "react-router-dom";
import NavSidebarContainer from "../nav_sidebar/nav_sidebar_container";

class Activity extends React.Component {

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
          <h1>Hey guy, you're at the activity dash</h1>
        </main>
      </div>
    );
  }

};

export default Activity;
