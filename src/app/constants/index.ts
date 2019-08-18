export const WHEEL_SET_VAL = "WHEEL_SET_VAL";
export const CHECK_RESULT: string = "CHECK_RESULT";

export const DEFAULT_START_TIME = 5 * 1000;
export const STOP_AFTER_START_TIME = 10 * 1000;
export const WHEEL_SPIN_TIME = 50;

export enum WheelType {
  wheel1 = "wheel1",
  wheel2 = "wheel2",
  wheel3 = "wheel3"
}

export enum WheelVariant {
  strawberry = "strawberry",
  banana = "banana",
  orange = "orange",
  monkey = "monkey",
}

export const wheelVars = [
  WheelVariant.strawberry,
  WheelVariant.banana,
  WheelVariant.orange,
  WheelVariant.monkey
];