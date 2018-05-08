import EntitiesReducer from "./entities/entities_reducer";
import { SessionReducer } from "./session/session_reducer";
import ErrorsReducer from "./errors/errors_reducer";
import { combineReducers } from "redux";


export default combineReducers({
  entities: EntitiesReducer,
  errors: ErrorsReducer,
  session: SessionReducer
});
