import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Homepage } from "./homepage";

const mapStateToProps = state => {
  return {
    logged_in: state.session.id || false
  };
};

const dashboard = connect(mapStateToProps)(Homepage);

export default withRouter(dashboard);
