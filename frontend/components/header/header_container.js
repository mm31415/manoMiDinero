import { connect } from "react-redux";
import { Header } from "./header";
import { logout, resetSessionErrors, addLogout } from "../../actions/session_actions";
import { withRouter } from "react-router";


const mapStateToProps = state => {
  if (state.session.id !== null) {
    return {
      user: state.entities.users[state.session.id]
    };
  } else {
    return { };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    resetSessionErrors: () => dispatch(resetSessionErrors()),
    addLogout: () => dispatch(addLogout())
  };
};

const header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(header);
