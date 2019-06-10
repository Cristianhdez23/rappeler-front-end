import React from "react";

import Backdrop from "../../UI/Backdrop/Backdrop";
import "./SideDrawer.scss";
import MonthsInformation from "../MonthsInformation";

const sideDrawer = props => {
  let attachedClasses = ["sideDrawer", "close"];
  if (props.open) {
    attachedClasses = ["sideDrawer", "open"];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <MonthsInformation />
      </div>
    </>
  );
};

export default sideDrawer;
