import { connect } from "react-redux";
import { Errors } from "./errors";

const mapStateToProps = state => {
  return {
    errors: state.errors.session
  };
};

export default connect(mapStateToProps)(Errors);
