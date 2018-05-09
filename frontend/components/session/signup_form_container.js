import { connect } from "react-redux";
import SignUpForm from "./signup_form";
import { signup } from "../../actions/session_actions";
import { withRouter } from "react-router";

const mapStateToProps = state => {
  return {
    user: {
      name: '',
      email: '',
      password: ''
    },
    errors: state.errors.session,
    formType: "signup",
    logged_in: state.session.id || false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (user) =>  dispatch(signup(user))
  };
};

const loginForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

export default withRouter(loginForm);
