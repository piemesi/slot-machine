import { all, delay, put, takeLatest, select } from "redux-saga/effects";

import { WHEEL_SET_VAL, CHECK_RESULT } from "approot/constants";
import { getResult } from "approot/selectors/results";
import { IWheelsResults } from "approot/reducers/results";
import { IStatsAction } from "approot/reducers/stats";

const getResults = state => state.results;

function* checkResultsThrottle() {
  yield delay(50);

  const results: IWheelsResults = yield select(getResults);
  const action: IStatsAction = { type: CHECK_RESULT, latestResult: getResult(results) };

  yield put(action);
}


function* WheelSetVal() {
  yield takeLatest(WHEEL_SET_VAL, checkResultsThrottle);
}

function* mySagas() {
  yield all([WheelSetVal()]);
}

export default mySagas;
