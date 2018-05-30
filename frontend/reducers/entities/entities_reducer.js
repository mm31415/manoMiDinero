import { UsersReducer } from "./users_reducer";
import { BillsReducer } from "./bills_reducer";
import { EditReducer } from "./edit_reducer";
import { PaymentsReducer } from "./payments_reducer";
import { combineReducers } from "redux";


export default combineReducers({
  users: UsersReducer,
  bills: BillsReducer,
  payments: PaymentsReducer,
  edit: EditReducer
});
