import React from "react";

import "./FilterBtns.scss";

const filterBtns = props => {
  return (
    <div className="btn-filter-block">
      <div className="btn-filter-block__btn-container">
        <button
          className={[
            "btn-filter-block__btn-container--btn btn-all",
            props.allButtonState ? "active-all" : null
          ].join(" ")}
          onClick={props.onClickAllButton}
          title="All"
        >
          All
        </button>
      </div>

      <div className="btn-filter-block__btn-container">
        <button
          className={[
            "btn-filter-block__btn-container--btn btn-confirmed",
            props.confirmedButtonState ? "active-confirmed" : null
          ].join(" ")}
          onClick={props.onClickConfirmedButton}
          title="Confirmed"
        >
          Confirmed
          <span className="fas fa-check icon-confirmed" />
        </button>
      </div>

      <div className="btn-filter-block__btn-container">
        <button
          className={[
            "btn-filter-block__btn-container--btn btn-pending",
            props.pendingButtonState ? "active-pending" : null
          ].join(" ")}
          onClick={props.onClickPendingButton}
          title="Pending"
        >
          Pending
          <span className="fas fa-clock icon-pending" />
        </button>
      </div>

      <div className="btn-filter-block__btn-container">
        <button
          className={[
            "btn-filter-block__btn-container--btn btn-cancelled",
            props.cancelledButtonState ? "active-cancelled" : null
          ].join(" ")}
          onClick={props.onClickCancelledButton}
          title="Cancelled"
        >
          Cancelled
          <span className="fas fa-times icon-cancelled" />
        </button>
      </div>
    </div>
  );
};

export default filterBtns;
