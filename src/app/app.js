import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import MyRoutes from "approot/routing";
import myStore from "approot/store";

render(
  <Provider store={myStore}>
    <MyRoutes/>
  </Provider>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}
