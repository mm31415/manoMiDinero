import React from "react";
import { Redirect } from "react-router-dom";
import NavSidebarContainer from "../nav_sidebar/nav_sidebar_container";
import { ContentHeader } from "../content_header/content_header";
import DashboardContainer from "../dashboard/dashboard_container";


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
    } else if (this.props.logged_in) {
      this.props.history.push("/dashboard");
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
