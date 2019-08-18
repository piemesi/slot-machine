import {WHEEL_SET_VAL, WheelType} from "approot/constants";

export interface IWheelsResults {
  wheel1: string
  wheel2: string
  wheel3: string
}

export interface IAction {
  type: string
  wheelType: WheelType
  result: string
}

export const resultIS: IWheelsResults = {
  [WheelType.wheel1]: null,
  [WheelType.wheel2]: null,
  [WheelType.wheel3]: null
};

const resultsReducer = (state = resultIS, action: IAction) => {
  switch (action.type) {
    case WHEEL_SET_VAL:
      return {
        ...state,
        [action.wheelType]: action.result
      };


    default:
      return state;
  }
};

export default resultsReducer;
