import React from "react";

//Style Files
import "./Backdrop.scss";

const backdrop = props =>
  props.show ? (
    <div
      className={[props.modal ? "backdrop-modal" : "backdrop"]}
      onClick={props.clicked}
    />
  ) : null;

export default backdrop;
