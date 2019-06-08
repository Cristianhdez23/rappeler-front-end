import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import "./Toolbar.scss";

const toolbar = props => {
  return (
    <header className="toolbar">
      <div className="toolbar__logo-block">
        <span className="toolbar__logo-block--logo">r</span>
      </div>
      <nav role="navigation">
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
