import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";

const modal = props => {
  let attachedClasses = ["modal", "closeModal"];
  if (props.open) {
    attachedClasses = ["modal", "openModal"];
  }

  let modalContent = null;
  if (props.isConfirmed) {
    modalContent = (
      <div>
        <h4>Are you sure you want to confirm this appointment?</h4>
        <div>
          <button onClick={props.changeToConfirmed}>Yes</button>
          <button onClick={props.closed}>No</button>
        </div>
      </div>
    );
  } else if (props.isCancelled) {
    modalContent = (
      <div>
        <h4>Are you sure you want to cancel this appointment?</h4>
        <div>
          <button onClick={props.changeToCancelled}>Yes</button>
          <button onClick={props.closed}>No</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} modal />
      <div className={attachedClasses.join(" ")}>{modalContent}</div>
    </>
  );
};

export default modal;
