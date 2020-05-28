import { combineReducers } from "redux";
import authReducer from "./login.reducer";
import adsReducer from "./ads.reducer";

export default combineReducers({
  auth: authReducer,
  ads: adsReducer,
});