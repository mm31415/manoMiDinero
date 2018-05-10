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
            <img id="avatar-img" src={window.staticImages.avatar} />
            <strong>{props.user.name}</strong>
            <Link to="/" className="logout-btn" onClick={handleLogout}>Logout</Link>
          </nav>
      </nav>
    );
  }
};
