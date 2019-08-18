import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

import asyncComponent from './asyncRouting';

const Main = asyncComponent(() =>
  import(
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    /* webpackChunkName: "main" */ '../components/Main'
    ).then(module => module.default),
);
const Stats = asyncComponent(() =>
  import(
    /* webpackMode: "lazy" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    /* webpackChunkName: "stats" */ '../components/Stats'
    ).then(module => module.default),
);

const AppRoutes = () => (
    <Router history={history}>
        <div className={'routing'}>
          <Route
            component={Main}
            exact
            path="/"
            type="main"
          />
          <Route component={Stats} exact path="/stats" type="stats" />
        </div>
    </Router>
);

export default AppRoutes;
