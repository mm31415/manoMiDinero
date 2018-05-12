import React from "react";
import { Redirect, Link } from "react-router-dom";

export const Homepage = (props) => {

  if (props.logged_in) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="homepage">
      <table>
        <tbody>
          <tr>
            <td>
              <img id="logo" src={window.staticImages.cLogo} />
            </td>
            <td>
              <h1>Split expenses with friends.</h1>
            </td>
          </tr>
          <tr>
            <td>
              <h2><em>Share&nbsp;</em>bills and IOUs.&nbsp;
                <em>Make sure&nbsp;</em>everyone gets paid back.&nbsp;
                  <em>Totally&nbsp;</em>free for web, iPhone, and Android.
              </h2>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <img id="browser-img" src={window.staticImages.browser} />
            </td>
            <td>
              <img id="mobile-img" src={window.staticImages.mobile} />
            </td>
          </tr>
        </tbody>
      </table>
      <Link id="signup-btn" to="/signup"><strong>Get Started Now</strong>(it's free!)</Link>
      <div className="devo-link">Logo made with&nbsp;<a href="https://www.designevo.com/" title="Free Online Logo Maker">DesignEvo</a></div>

    </div>
  );
};
