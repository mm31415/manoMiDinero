import React from "react";
import { Redirect } from "react-router-dom";
import NavSidebarContainer from "../nav_sidebar/nav_sidebar_container";
import { Link } from "react-router-dom";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriends();
    this.props.fetchBills();
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
      <div className="all-content">
        <nav className="left-sidebar">
          <NavSidebarContainer />
        </nav>
        <main className="main-content">
          <header id="main-header">
            <h1>Hey Guy this is the main header</h1>
            <Link to="/" onClick={this.handleClick}>Add Bill</Link>
          </header>
        </main>
        <div className="right-sidebar"></div>
      </div>
    );
  }

};

export default MainContent;
