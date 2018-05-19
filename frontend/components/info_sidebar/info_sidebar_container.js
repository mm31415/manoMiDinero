import { InfoSidebar } from "./info_sidebar";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { deleteFriend } from "../../actions/friendship_actions";

// const mapStateToProps = state => {
//   bills:
// }

const mapDispatchToProps = dispatch => {
  return {
    deleteFriend: (id) => dispatch(deleteFriend(id))
  };
};

const infoSidebar = connect(null, mapDispatchToProps)(InfoSidebar);

export default withRouter(infoSidebar);
