import b from "b_";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { wheelSetVal } from "approot/actions";
import { wheelVars, STOP_AFTER_START_TIME, WHEEL_SPIN_TIME, DEFAULT_START_TIME } from "approot/constants";

const checkAutoStop = timeStarted => Date.now() - timeStarted >= STOP_AFTER_START_TIME;

const getRandomVar = (currentVar = null) => {
  const possibleVars = currentVar ? wheelVars.filter(v => v !== currentVar) : wheelVars;
  return possibleVars[Math.floor(Math.random() * possibleVars.length)];
};

import /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "wheels-scss" */ "./wheels__wheel.scss";

const Wheel = ({ type, stopIt, timeStarted, ...props }) => {
  const [currentVar, setCurrentVar] = useState(null);

  useEffect(() => {
    if (!timeStarted) {
      if (currentVar) {
        props.wheelSetVal(type, currentVar);
      }

      return;
    }

    const timeoutID = setTimeout(() => setCurrentVar(getRandomVar(currentVar)), WHEEL_SPIN_TIME);

    if (checkAutoStop(timeStarted)) {
      stopIt();
    }

    return () => clearTimeout(timeoutID);

  }, [currentVar, timeStarted]);

  return (
    <div className={b("wheels", "wheel", { type, img: currentVar || "start" })}>
      {currentVar || `Start in ${DEFAULT_START_TIME / 1000} seconds`}
    </div>
  );
};

Wheel.propTypes = {
  stopIt: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  timeStarted: PropTypes.number,
  wheelSetVal: PropTypes.func.isRequired
};

export default connect(null, { wheelSetVal })(Wheel);
