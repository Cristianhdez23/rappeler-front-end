import React from "react";

//Components
import Backdrop from "../Backdrop/Backdrop";
//Style Files
import "./Modal.scss";

const modal = props => {
  let attachedClasses = ["modal", "closeModal"];
  if (props.open) {
    attachedClasses = ["modal", "openModal"];
  }

  let modalContent = null;
  if (props.isConfirmed) {
    modalContent = (
      <div className="modal-content">
        <h4 className="modal-content--title">
          Are you sure you want to confirm this appointment?
        </h4>
        <div className="modal-content__buttons-block">
          <button
            title="Yes"
            className="modal-content__buttons-block--btn"
            onClick={props.changeToConfirmed}
          >
            Yes
          </button>
          <button
            title="No"
            className="modal-content__buttons-block--btn"
            onClick={props.closed}
          >
            No
          </button>
        </div>
      </div>
    );
  } else if (props.isCancelled) {
    modalContent = (
      <div className="modal-content">
        <h4 className="modal-content--title">
          Are you sure you want to cancel this appointment?
        </h4>
        <div className="modal-content__buttons-block">
          <button
            title="Yes"
            className="modal-content__buttons-block--btn"
            onClick={props.changeToCancelled}
          >
            Yes
          </button>
          <button
            title="No"
            className="modal-content__buttons-block--btn"
            onClick={props.closed}
          >
            No
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} modal />
      <div className={attachedClasses.join(" ")}>
        <button className="close-button" title="Close" onClick={props.closed}>
          <span className="fas fa-times" />
        </button>
        {modalContent}
      </div>
    </>
  );
};

export default modal;
