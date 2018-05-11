import React from "react";
import { Link } from "react-router-dom";


export const MainNav = (props) => {
  return (
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/activity">Recent activity</Link></li>
      <li><Link to="/all">All expences</Link></li>
    </ul>
  );
};
