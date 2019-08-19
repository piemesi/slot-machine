import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";

import myStore from "approot/store";
import { WHEEL_SPIN_TIME, wheelVars, WheelType, DEFAULT_START_TIME } from "approot/constants";

import Wheel from "approot/components/Wheels/__wheel";

jest.useFakeTimers();

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("check changing of variant on a wheel after spin", () => {
  const stopIt = jest.fn();
  const wheelSetVal = jest.fn();
  act(() => {
    render(<Provider store={myStore}>
      <Wheel type={WheelType.wheel1} stopIt={stopIt} timeStarted={Date.now()} wheelSetVal={wheelSetVal}/>
    </Provider>, container);
  });

  const currentValDiv = document.querySelector(`.wheels__wheel.wheels__wheel_type_${WheelType.wheel1}`);

  expect(currentValDiv.innerHTML).toBe(`Start in ${DEFAULT_START_TIME / 1000} seconds`);

  act(() => {
    jest.advanceTimersByTime(WHEEL_SPIN_TIME + 1);
  });
  const firstVal = currentValDiv.innerHTML;
  // symbol should change and be one of the `wheelVars` symbols
  expect(firstVal).not.toBe(`Start in ${DEFAULT_START_TIME / 1000} seconds`);
  expect(wheelVars.includes(firstVal)).toBe(true);

  // 3ms before changing of spin - should be the same symbol as previous check
  act(() => {
    jest.advanceTimersByTime(WHEEL_SPIN_TIME - 3);
  });
  expect(currentValDiv.innerHTML).toBe(firstVal);

  // add 4ms and symbol should changes
  act(() => {
    jest.advanceTimersByTime(4);
  });
  expect(currentValDiv.innerHTML).not.toBe(firstVal);
  expect(wheelVars.includes(currentValDiv.innerHTML)).toBe(true);
});
