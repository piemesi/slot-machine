import b from "b_";
import PropTypes from "prop-types";
import React from "react";

import Button from "./__button";

import /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "buttons-scss" */ './buttons.scss';

const Buttons = ({ startIt, stopIt, isTimeStarted }) => (
  <div className={"buttons"}>
    <Button
      disabled={isTimeStarted}
      key={"start"}
      mix={b("buttons", "button", { active: !isTimeStarted, start: true })}
      onClick={startIt}
      title={"Start"}
    />
    <Button
      disabled={!isTimeStarted}
      key={"stop"}
      mix={b("buttons", "button", { active: isTimeStarted, stop: true })}
      onClick={stopIt}
      title={"Stop"}
    />
  </div>
);

Buttons.propTypes = {
  isTimeStarted: PropTypes.bool.isRequired,
  startIt: PropTypes.func.isRequired,
  stopIt: PropTypes.func.isRequired
};

export default Buttons;
