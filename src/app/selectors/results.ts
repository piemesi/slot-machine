import { createSelector } from "reselect";

import { groupBy } from "apputils/lodash";

import { IWheelsResults } from "approot/reducers/results";
import { WheelType } from "approot/constants";

const wheel1Selector = (results: IWheelsResults): string => results[WheelType.wheel1];
const wheel2Selector = (results: IWheelsResults): string  => results[WheelType.wheel2];
const wheel3Selector = (results: IWheelsResults): string  => results[WheelType.wheel3];

export const getResult = createSelector(
  [wheel1Selector, wheel2Selector, wheel3Selector],
  (wheel1, wheel2, wheel3) => {
    const resultVals = [wheel1, wheel2, wheel3];
    const uniqueVals = resultVals
      .reduce((unique, item) => (unique.find(id => id === item) ? unique : [...unique, item]), []);

    if (uniqueVals.length === resultVals.length) {
      // no equal symbols  - no win
      return 0;
    }

    if (uniqueVals.length === 1) {
      // all symbols  are the same - The same symbol in all the wheels, the prize is 100 dollars
      return 100;
    }

    if (wheel3 === wheel1) {
      //Two identical non-consecutive symbols, the prize is 10 dollars
      return 10;
    }

    // Two consecutive symbols, then the prize is 20 dollars.
    return 20;

  }
);