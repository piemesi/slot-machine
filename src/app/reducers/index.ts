import { combineReducers } from "redux";

import stats from "./stats";
import results from "./results";

export interface IStore {
  stats: object
  results: object
}

export default combineReducers({
  results,
  stats
});
