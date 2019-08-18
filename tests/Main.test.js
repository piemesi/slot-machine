import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import myStore from "approot/store";
import { DEFAULT_START_TIME } from "approot/constants";

import Main from "approot/components/Main";

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

it("check that after DEFAULT_START_TIME - automatically start", () => {
  act(() => {
    render(<Provider store={myStore}>
      <Router>
        <Main/>
      </Router>
    </Provider>, container);
  });

  const buttonStart = document.querySelector("button.buttons__button_start");
  const buttonStop = document.querySelector("button.buttons__button_stop");

  expect(buttonStart.innerHTML).toBe("Start");

  // move ahead in time by 100ms
  act(() => {
    jest.advanceTimersByTime(100);
  });

  expect(buttonStart.className).toBe("buttons__button buttons__button_active buttons__button_start");
  expect(buttonStop.className).toBe("buttons__button buttons__button_stop");

  // and then move ahead by DEFAULT_START_TIME seconds
  act(() => {
    jest.advanceTimersByTime(DEFAULT_START_TIME);
  });
  expect(buttonStart.className).toBe("buttons__button buttons__button_start");
  expect(buttonStop.className).toBe("buttons__button buttons__button_active buttons__button_stop");
});


it("check that spin starts after pressing start button ", () => {
  act(() => {
    render(<Provider store={myStore}>
      <Router>
        <Main/>
      </Router>
    </Provider>, container);
  });
  const buttonStart = document.querySelector("button.buttons__button_start");
  const buttonStop = document.querySelector("button.buttons__button_stop");

  expect(buttonStart.innerHTML).toBe("Start");

  act(() => {
    buttonStart.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(buttonStart.className).toBe("buttons__button buttons__button_start");
  expect(buttonStop.className).toBe("buttons__button buttons__button_active buttons__button_stop");

});
