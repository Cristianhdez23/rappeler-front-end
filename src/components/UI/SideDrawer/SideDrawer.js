import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import "./SideDrawer.scss";

const sideDrawer = props => {
  let attachedClasses = ["sideDrawer", "closeSideDrawer"];
  if (props.open) {
    attachedClasses = ["sideDrawer", "openSideDrawer"];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>{props.children}</div>
    </>
  );
};

export default sideDrawer;
