import React from "react";

import FilterBtns from "./FilterBtns/FilterBtns";
import "./FilterBar.scss";

const filterBar = props => {
  return (
    <div className="advanced__filter-bar">
      <h6 className="advanced__filter-bar--title">Show Only</h6>
      <div className="advanced__filter-bar__buttons-block">
        <div className="advanced__filter-bar__buttons-block__filter-buttons">
          <h6 className="advanced__filter-bar__buttons-block__filter-buttons--title">
            Show Only:
          </h6>
          <FilterBtns
            onClickAllButton={props.onClickAllButton}
            onClickConfirmedButton={props.onClickConfirmedButton}
            onClickPendingButton={props.onClickPendingButton}
            onClickCancelledButton={props.onClickCancelledButton}
            allButtonState={props.allButtonState}
            confirmedButtonState={props.confirmedButtonState}
            pendingButtonState={props.pendingButtonState}
            cancelledButtonState={props.cancelledButtonState}
          />
        </div>
        <div className="advanced__filter-bar__buttons-block__add-appointment-button">
          <button className="advanced__filter-bar__buttons-block__add-appointment-button--btn" title="Add Appointment">
            <span className="fas fa-plus-circle" />
            Add Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default filterBar;
