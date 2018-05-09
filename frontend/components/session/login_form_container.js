import { connect } from "react-redux";
import SignUpForm from "./signup_form";
import { login } from "../../actions/session_actions";

const mapStateToProps = state => {
  return {
    user: {
      email: '',
      password: ''
    },
    errors: state.errors.session,
    formType: "login"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user) =>  dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
