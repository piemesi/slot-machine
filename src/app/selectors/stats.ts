import { createSelector } from "reselect";

import { IStats } from "approot/reducers/stats";

const resultsStackSelector = ({ resultsStack }: IStats): number[] => resultsStack;
const latestResultSelector = ({ latestResult }: IStats): number => latestResult;

export const getTotalResult = createSelector(
  [resultsStackSelector],
  stack => stack.reduce((sum, x) => sum + x, 0)
);
export const getLatestResult = createSelector(
  [latestResultSelector],
  latest => latest
);