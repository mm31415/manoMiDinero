import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Dashboard } from "./dashboard";

const mapStateToProps = state => {
  return {
    logged_in: state.session.id || false
  };
};

const dashboard = connect(mapStateToProps)(Dashboard);

export default withRouter(dashboard);
