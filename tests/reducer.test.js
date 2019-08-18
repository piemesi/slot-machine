import { act } from "react-dom/test-utils";

import { WHEEL_SET_VAL, CHECK_RESULT, WheelVariant, WheelType } from "approot/constants";
import { getResult } from "approot/selectors/results";
import results, { resultIS } from "approot/reducers/results";
import stats, { initialState as statsIS } from "approot/reducers/stats";

describe("results changes Reducer", () => {
  let resultReducer;

  it("handles WHEEL_SET_VAL as expected", () => {
    resultReducer = results(resultIS, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel3
    });

    expect(resultReducer).toEqual({
      [WheelType.wheel1]: null,
      [WheelType.wheel2]: null,
      [WheelType.wheel3]: WheelVariant.monkey
    });

    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel1
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel2
    });

    expect(resultReducer).toEqual({
      wheel1: WheelVariant.monkey,
      wheel2: WheelVariant.monkey,
      wheel3: WheelVariant.monkey
    });
  });

  it("checks 100 Dollars earning as expected", () => {
    resultReducer = results(resultIS, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel1
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel2
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel3
    });

    expect(resultReducer).toEqual({
      wheel1: WheelVariant.monkey,
      wheel2: WheelVariant.monkey,
      wheel3: WheelVariant.monkey
    });

    const statsReducer = stats(statsIS, { type: CHECK_RESULT, latestResult: getResult(resultReducer) });

    expect(statsReducer.latestResult).toEqual(100);
  });

  it("checks 10 Dollars earning as expected", () => {
    resultReducer = results(resultIS, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.banana,
      wheelType: WheelType.wheel1
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel2
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.banana,
      wheelType: WheelType.wheel3
    });

    expect(resultReducer).toEqual({
      wheel1: WheelVariant.banana,
      wheel2: WheelVariant.monkey,
      wheel3: WheelVariant.banana
    });

    const statsReducer = stats(statsIS, { type: CHECK_RESULT, latestResult: getResult(resultReducer) });

    expect(statsReducer.latestResult).toEqual(10);
  });

  it("checks 20 Dollars earning as expected", () => {
    resultReducer = results(resultIS, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel1
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel2
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.banana,
      wheelType: WheelType.wheel3
    });

    expect(resultReducer).toEqual({
      wheel1: WheelVariant.monkey,
      wheel2: WheelVariant.monkey,
      wheel3: WheelVariant.banana
    });

    const statsReducer = stats(statsIS, { type: CHECK_RESULT, latestResult: getResult(resultReducer) });

    expect(statsReducer.latestResult).toEqual(20);
  });

  it("checks fails spin with 0 Dollars to earn", () => {
    resultReducer = results(resultIS, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.monkey,
      wheelType: WheelType.wheel1
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.strawberry,
      wheelType: WheelType.wheel2
    });
    resultReducer = results(resultReducer, {
      type: WHEEL_SET_VAL,
      result: WheelVariant.banana,
      wheelType: WheelType.wheel3
    });

    expect(resultReducer).toEqual({
      wheel1: WheelVariant.monkey,
      wheel2: WheelVariant.strawberry,
      wheel3: WheelVariant.banana
    });

    const statsReducer = stats(statsIS, { type: CHECK_RESULT, latestResult: getResult(resultReducer) });

    expect(statsReducer.latestResult).toEqual(0);
  });

});

