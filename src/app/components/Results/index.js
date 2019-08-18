import b from "b_";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { getLatestResult, getTotalResult } from "approot/selectors/stats";

import /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "results-scss" */ "./results.scss";

const Results = ({ latest, total }) => (
  <div className={"results"}>
    <h3>Stats</h3>

    Latest Result is: <strong className={b("results", "last", { val: latest })}>{latest}USD</strong><br/>
    Total Result is: <strong>{total}USD</strong>

  </div>
);

Results.propTypes = {
  latest: PropTypes.number,
  total: PropTypes.number
};

export default connect(({ stats }) => ({
  latest: getLatestResult(stats),
  total: getTotalResult(stats)
}))(Results);
