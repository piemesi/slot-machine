import PropTypes from "prop-types";
import React from "react";

import /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "buttons-scss" */ './buttons__button.scss';

const Button = ({ disabled, mix, onClick, title }) => (
  <button
    className={mix}
    disabled={disabled}
    onClick={onClick}
  >
    {title}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  mix: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Button;
