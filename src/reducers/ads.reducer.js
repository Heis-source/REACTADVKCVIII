import { SET_ADS } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  data: [],
};

export default function(state = [], action) {
  switch (action.type) {
    case SET_ADS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}