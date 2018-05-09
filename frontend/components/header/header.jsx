import React from "react";
import { Link } from "react-router-dom";

export const Header = (props) => {

  const handleLogout = () => {
    props.logout();
    props.history.push('/login');
  };
  
  if (props.user === undefined) {
    return (
      <nav>
        <Link to="/">SplitWiseClone</Link><br/>
        <Link to="/login">Log in</Link><br/>
        or<br/>
        <Link to="/signup">Sign up</Link><br/>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/">SplitWiseClone</Link><br/>
        <h2>Welcome {props.user.name}</h2><br/>
        <button onClick={handleLogout}>Logout</button><br/>
      </nav>
    );
  }
};
