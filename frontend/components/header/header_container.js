import { connect } from "react-redux";
import { Header } from "./header";
import { logout, resetSessionErrors } from "../../actions/session_actions";

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
    resetSessionErrors: () => dispatch(resetSessionErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
