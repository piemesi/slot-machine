import React, { useState, useEffect, useMemo } from "react";

import { DEFAULT_START_TIME } from "approot/constants";

import Buttons from "approot/components/Buttons";
import Links from "approot/components/Links";
import Results from "approot/components/Results";
import Wheels from "approot/components/Wheels";

import /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "main-scss" */ "./main.scss";

const Main = () => {
  const [timeStarted, toggleStart] = useState(null);

  useEffect(() => {
    if (timeStarted) {
      return;
    }
    const timeoutID = setTimeout(startIt, DEFAULT_START_TIME);

    return () => clearTimeout(timeoutID);
  }, []);

  const startIt = () => toggleStart(cur => cur || Date.now());
  const stopIt = () => toggleStart(null);

  return (
    <div className={"main"}>
      {useMemo(() => <Buttons isTimeStarted={Boolean(timeStarted)} startIt={startIt} stopIt={stopIt} />, [timeStarted])}

      {useMemo(() => <Wheels stopIt={stopIt} timeStarted={timeStarted} />, [timeStarted])}

      {useMemo(() => <Results />, [])}

      <Links isMain />

    </div>
  );
};

export default Main;
