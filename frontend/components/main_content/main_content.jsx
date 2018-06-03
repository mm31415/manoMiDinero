import React from "react";
import { Redirect } from "react-router-dom";
import NavSidebarContainer from "../nav_sidebar/nav_sidebar_container";
import InfoSidebarContainer from "../info_sidebar/info_sidebar_container";
import { ContentHeader } from "../content_header/content_header";
import DashboardContainer from "../dashboard/dashboard_container";
import ExpenseContainer from "../expense/expense_container";
import FriendContainer from "../friend/friend_container";
import { Route } from "react-router-dom";


class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFriends();
    this.props.fetchBills();
    this.props.fetchPayments();
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
          <ContentHeader location={this.props.location.pathname} friendName={this.props.friendName} />
          <Route path="/main/dashboard" component={DashboardContainer} />
          <Route path="/main/all" component={ExpenseContainer} />
          <Route path="/main/friends/:friendId" component={FriendContainer} />
        </main>
        <nav className="right-sidebar">
          <InfoSidebarContainer />
        </nav>
      </div>
    );
  }

};

export default MainContent;
