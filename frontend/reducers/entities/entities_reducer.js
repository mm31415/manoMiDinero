import { UsersReducer } from "./users_reducer";
import { combineReducers } from "redux";

export default combineReducers({
  users: UsersReducer
});
