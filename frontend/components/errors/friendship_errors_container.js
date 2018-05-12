import { connect } from "react-redux";
import { Errors } from "./errors";

const mapStateToProps = state => {
  return {
    errors: state.errors.friendship
  };
};

export default connect(mapStateToProps)(Errors);
