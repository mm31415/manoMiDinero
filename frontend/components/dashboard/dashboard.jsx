import React from "react";
import { Redirect } from "react-router-dom";
import NavSidebarContainer from "../nav_sidebar/nav_sidebar_container";
import { ContentHeader } from "../content_header/content_header";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriends();
  }

  handleClick (e) {
    e.preventDefault();
    const modal_form = document.getElementById("add-bill-form");
    const modal = document.getElementById("add-bill-modal");
    modal.style.display = "block";
    modal_form.classList.add("fade-in");
  }

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
