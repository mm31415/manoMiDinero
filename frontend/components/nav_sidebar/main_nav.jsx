import React from "react";
import { Link } from "react-router-dom";


export const MainNav = (props) => {

  const checkIfSelected = (path) => {
    if (props.location === path) {
      return "selected";
    } else {
      return "";
    }
  };

  return (
    <ul className="main-nav">
      <li className={checkIfSelected("/dashboard")}>
        <Link to="/dashboard"><img id="logo" src={window.staticImages.cLogo} />&nbsp;Dashboard</Link>
      </li>
      <li className={checkIfSelected("/activity")}>
        <Link to="/activity"><i className="fa fa-flag-checkered"/>&nbsp;Recent activity</Link>
      </li>
      <li className={checkIfSelected("/all")}>
        <Link to="/all"><i className="fa fa-list"/>&nbsp;All expences</Link>
      </li>
    </ul>
  );
};
