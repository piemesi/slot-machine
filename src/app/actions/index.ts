import { WHEEL_SET_VAL, WheelType, WheelVariant } from "approot/constants";
import { IAction } from "approot/reducers/results";

export const wheelSetVal = (wheelType: WheelType, result: WheelVariant): IAction =>
  ({ type: WHEEL_SET_VAL, result, wheelType });