import React from "react";
import { Redirect } from "react-router-dom";
import NavSidebarContainer from "../nav_sidebar/nav_sidebar_container";
import { ContentHeader } from "../content_header/content_header";


class Friend extends React.Component {

  render() {
    if (!this.props.logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div className="friend-show">
        <h1>Hey guy, you're at the friend dash</h1>
      </div>
    );
  }
  
};

export default Friend;
