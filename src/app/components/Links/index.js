import b from "b_";
import PropTypes from "prop-types";
import React from "react";

const RouterLink = require("react-router-dom").Link;

import /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  /* webpackChunkName: "links-scss" */ "./links.scss";

const Links = ({ isMain }) => (
  <div className={"links"}>
    <RouterLink className={b("links", "link", { active: isMain })} to={"/"}>Main</RouterLink>

    <RouterLink className={b("links", "link", { active: !isMain })} to={"/stats"}>Stats</RouterLink>
  </div>
);

Links.propTypes = {
  isMain: PropTypes.bool
};

export default Links;
