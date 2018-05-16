import React from "react";
import { Redirect } from "react-router-dom";
import NavSidebarContainer from "../nav_sidebar/nav_sidebar_container";
import { ContentHeader } from "../content_header/content_header";
import DashboardContainer from "../dashboard/dashboard_container";
import { Route } from "react-router-dom";


class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFriends();
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
          <ContentHeader />
          <Route path="/main/dashboard" component={DashboardContainer} />
        </main>
        <div className="right-sidebar"></div>
      </div>
    );
  }

};

export default MainContent;
