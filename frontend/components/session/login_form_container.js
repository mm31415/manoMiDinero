import { connect } from "react-redux";
import SignUpForm from "./signup_form";
import { login } from "../../actions/session_actions";
import { withRouter } from "react-router";

const mapStateToProps = state => {
  return {
    user: {
      email: '',
      password: ''
    },
    errors: state.errors.session,
    formType: "login",
    logged_in: state.session.id || false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user) =>  dispatch(login(user))
  };
};

const signUpForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

export default withRouter(signUpForm);
