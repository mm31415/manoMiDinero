import EntitiesReducer from "./entities/entities_reducer";
import { SessionReducer } from "./session/session_reducer";
import { combineReducers } from "redux";

export default combineReducers({
  entities: EntitiesReducer,
  session: SessionReducer
});
