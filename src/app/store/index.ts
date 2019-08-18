import { createStore, applyMiddleware, compose } from "redux";
import sagaMiddlewareFactory from "redux-saga";

import myReducer from "approot/reducers";
import { throttle } from "apputils/lodash";
import { loadState, saveState } from "apputils/localStorage";

import "babel-polyfill";

import mySaga from "./sagas";

const sagaMiddleware = sagaMiddlewareFactory();

import loggerMiddleware from "./middleware/logger";
import { IStore } from "../reducers";

const persistedState = loadState() || {};

const myStore = createStore(
  myReducer,
  persistedState,
  compose(applyMiddleware(loggerMiddleware, sagaMiddleware))
);

sagaMiddleware.run(mySaga);

const store: IStore = myStore.getState();

myStore.subscribe(
  throttle(() => {
    saveState({ stats: store.stats });
  }, 3500)
);

export default myStore;
