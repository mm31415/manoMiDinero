import { connect } from "react-redux";
import SignUpForm from "./signup_form";
import { signup } from "../../actions/session_actions";

const mapStateToProps = state => {
  return {
    user: {
      name: '',
      email: '',
      password: ''
    },
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (user) =>  dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
