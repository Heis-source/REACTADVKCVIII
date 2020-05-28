import { SET_ADS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SET_ADS:
      return {
        ...state,
        ads: action.payload
      };
    default:
      return state;
  }
}