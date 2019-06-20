import React from "react";

//Components
import NavigationItems from "../NavigationItems/NavigationItems";
//Style Files
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
