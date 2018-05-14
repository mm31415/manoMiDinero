import { UsersReducer } from "./users_reducer";
import BillsReducer from "./bills_reducer";
import { combineReducers } from "redux";


export default combineReducers({
  users: UsersReducer,
  bills: BillsReducer
});
