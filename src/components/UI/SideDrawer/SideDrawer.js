import React from "react";

//Components
import Backdrop from "../Backdrop/Backdrop";
//Style Files
import "./SideDrawer.scss";

const sideDrawer = props => {
  let attachedClasses = ["sideDrawer", "closeSideDrawer"];
  if (props.open) {
    attachedClasses = ["sideDrawer", "openSideDrawer"];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <button className="close-button" title="Close" onClick={props.closed}>
          <span className="fas fa-times" />
        </button>
        {props.children}
      </div>
    </>
  );
};

export default sideDrawer;
