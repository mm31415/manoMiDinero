import React from "react";
import { Link } from "react-router-dom";

export const Header = (props) => {

  const handleLogout = () => {
    props.logout();
    props.history.push('/login');
  };

  if (props.user === undefined) {
    return (
      <nav className="header">
        <Link to="/" className="homepage-link" onClick={props.resetSessionErrors}>SPLITWISECLONE</Link>
        <nav className="header-nav">
          <Link className="login-btn" to="/login" onClick={props.resetSessionErrors}>Log in</Link>
          <strong>or</strong>
          <Link className="signup-btn" to="/signup" onClick={props.resetSessionErrors}>Sign up</Link>
        </nav>
      </nav>
    );
  } else {
    return (
      <nav className="header">
        <Link to="/" className="homepage-link" onClick={props.resetSessionErrors}>SPLITWISECLONE</Link>
          <nav className="header-nav">
            Welcome {props.user.name}
            <button onClick={handleLogout}>Logout</button>
          </nav>
      </nav>
    );
  }
};
