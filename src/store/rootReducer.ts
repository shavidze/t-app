import { combineReducers } from "redux";
import usersReducer from "../features/User/store/reducer";
const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
