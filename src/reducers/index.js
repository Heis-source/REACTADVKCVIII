import { combineReducers } from "redux";
import authReducer from "./lo";

export default combineReducers({
  auth: authReducer,
});