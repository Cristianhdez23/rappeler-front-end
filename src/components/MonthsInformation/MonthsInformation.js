import React, { Component } from "react";

import "./MonthsInformation.scss";

class MonthsInformation extends Component {
  state = {};
  render() {
    return (
      <section className="monthsInformation__container">
        <section className="monthsInformation__container__date-block">
          <button
            className="monthsInformation__container__date-block--left-arrow"
            title="Last Month"
            aria-label="Go to the last month"
          >
            <span className="fas fa-chevron-left" />
          </button>
          <h3 className="monthsInformation__container__date-block--month">
            September{" "}
            <span className="monthsInformation__container__date-block--month--year">
              2018
            </span>
          </h3>
          <button
            className="monthsInformation__container__date-block--right-arrow"
            title="Next Month"
            aria-label="Go to the next month"
          >
            <span className="fas fa-chevron-right" />
          </button>
        </section>
        <section className="monthsInformation__container__status-block">
          <div className="monthsInformation__container__status-block__status-detail">
            <div className="monthsInformation__container__status-block__status-detail--icon confirmed-block">
              <span className="fas fa-check icon-confirmed" />
            </div>
            <h6 className="monthsInformation__container__status-block__status-detail--information">
              5{" "}
              <span className="monthsInformation__container__status-block__status-detail--information--status">
                Confirmed
              </span>
            </h6>
          </div>

          <div className="monthsInformation__container__status-block__status-detail">
            <div className="monthsInformation__container__status-block__status-detail--icon pending-block">
              <span className="fas fa-clock icon-pending" />
            </div>
            <h6 className="monthsInformation__container__status-block__status-detail--information">
              3{" "}
              <span className="monthsInformation__container__status-block__status-detail--information--status">
                Pending
              </span>
            </h6>
          </div>

          <div className="monthsInformation__container__status-block__status-detail">
            <div className="monthsInformation__container__status-block__status-detail--icon cancelled-block">
              <span className="fas fa-times icon-cancelled" />
            </div>
            <h6 className="monthsInformation__container__status-block__status-detail--information">
              1{" "}
              <span className="monthsInformation__container__status-block__status-detail--information--status">
                Cancelled
              </span>
            </h6>
          </div>
        </section>
      </section>
    );
  }
}

export default MonthsInformation;
