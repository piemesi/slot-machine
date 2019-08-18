import React from "react";

import Links from "approot/components/Links";
import Results from "approot/components/Results";

import /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "stats-scss" */ "./stats.scss";


const Stats = () => <div className="stats"><Results/> <Links/></div>;

export default Stats;
