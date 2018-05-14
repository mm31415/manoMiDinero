import { combineReducers } from "redux";
import { SessionErrorsReducer }  from "./session_errors_reducer";
import { FriendshipErrorsReducer } from "./friendship_errors_reducer"
import { BillErrorsReducer } from "./bill_errors_reducer"

export default combineReducers({
  session: SessionErrorsReducer,
  friendship: FriendshipErrorsReducer,
  bill: BillErrorsReducer
});
