import PropTypes from "prop-types";
import React from "react";

import { WheelType } from "approot/constants";

import Wheel from "./__wheel";

import /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "wheels-scss" */ './wheels.scss';

const Wheels = ({ stopIt, timeStarted }) => (
  <div className={"wheels"}>
    <Wheel key={WheelType.wheel1} stopIt={stopIt} timeStarted={timeStarted} type={WheelType.wheel1}/>
    <Wheel key={WheelType.wheel2} stopIt={stopIt} timeStarted={timeStarted} type={WheelType.wheel2}/>
    <Wheel key={WheelType.wheel3} stopIt={stopIt} timeStarted={timeStarted} type={WheelType.wheel3}/>
  </div>
);

Wheels.propTypes = {
  stopIt: PropTypes.func.isRequired,
  timeStarted: PropTypes.number,
};

export default Wheels;
