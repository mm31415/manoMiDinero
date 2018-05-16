import React from "react";
import { Redirect } from "react-router-dom";


class Activity extends React.Component {

  render() {
    if (!this.props.logged_in) {
      return <Redirect to="/" />;
    }

    return (
      <div className="activity">
        <h1>Hey guy, you're at the activity dash</h1>
      </div>
    );
  }

};

export default Activity;
