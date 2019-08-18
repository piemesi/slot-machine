import { CHECK_RESULT } from "approot/constants";

export interface IStatsAction {
  latestResult: number
  type: string
}

export interface IStats {
  latestResult: number
  resultsStack: number[]
}

export const initialState: IStats = {
  latestResult: null,
  resultsStack: []
};

const statsReducer = (state: IStats = initialState, action: IStatsAction) => {
  switch (action.type) {
    case CHECK_RESULT:
      return {
        resultsStack: [...state.resultsStack, action.latestResult],
        latestResult: action.latestResult
      };

    default:
      return state;
  }
};

export default statsReducer;
