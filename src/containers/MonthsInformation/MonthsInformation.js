import React, { Component } from "react";
import { connect } from "react-redux";

import "./MonthsInformation.scss";

import * as actions from "./MonthsInformationActions";

class MonthsInformation extends Component {
  componentWillMount() {
    if (!this.props.mobileVersion) {
      const realTimeDateAndTime = new Date();
      const year = realTimeDateAndTime.getFullYear();
      const month = realTimeDateAndTime.getMonth();
      this.props.onInitSetMonthAndYear(month, year);
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.mobileVersion) {
      if (this.props.month) {
        const month = `${this.props.month < 10 ? "0" : ""}${this.props.month +
          1}`;
        const startDate = this.props.year + "/" + month + "/15"; // Change to 01
        const endDate = this.props.year + "/" + month + "/16"; // Change to 31
        if (prevProps.month !== this.props.month) {
          this.props.onInitFetchMonthInformation(startDate, endDate);
        }
      }
    }
  }

  prevMonth = event => {
    event.preventDefault();
    event.target.blur();
    let month = this.props.month - 1 === -1 ? 11 : this.props.month - 1;
    let year = month === 11 ? this.props.year - 1 : this.props.year;
    this.props.onInitSetMonthAndYear(month, year);
  };

  nextMonth = event => {
    event.preventDefault();
    event.target.blur();
    let month = this.props.month + 1 === 12 ? 0 : this.props.month + 1;
    let year = month === 0 ? this.props.year + 1 : this.props.year;
    this.props.onInitSetMonthAndYear(month, year);
  };

  getMonthName = idx => {
    return [
      "January ",
      "February ",
      "March ",
      "April ",
      "May ",
      "June ",
      "July ",
      "August ",
      "September ",
      "October ",
      "November ",
      "December "
    ][idx];
  };

  render() {
    let monthName = this.getMonthName(this.props.month);
    let year = this.props.year;
    let confirmedQuantity = this.props.confirmedQuantity
      ? this.props.confirmedQuantity
      : "0";
    let pendingQuantity = this.props.pendingQuantity
      ? this.props.pendingQuantity
      : "0";
    let cancelledQuantity = this.props.cancelledQuantity
      ? this.props.cancelledQuantity
      : "0";

    return (
      <section className="monthsInformation__container">
        <section className="monthsInformation__container__date-block">
          <button
            className="monthsInformation__container__date-block--left-arrow"
            title="Last Month"
            aria-label="Go to the last month"
            onClick={this.prevMonth}
          >
            <span className="fas fa-chevron-left" />
          </button>
          <h3 className="monthsInformation__container__date-block--month">
            {monthName}
            <span className="monthsInformation__container__date-block--month--year">
              {year}
            </span>
          </h3>
          <button
            className="monthsInformation__container__date-block--right-arrow"
            title="Next Month"
            aria-label="Go to the next month"
            onClick={this.nextMonth}
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
              {confirmedQuantity}{" "}
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
              {pendingQuantity}{" "}
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
              {cancelledQuantity}{" "}
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

const mapStateToProps = state => {
  return {
    month: state.monthsInformation.month,
    year: state.monthsInformation.year,
    confirmedQuantity: state.monthsInformation.confirmedQuantity,
    pendingQuantity: state.monthsInformation.pendingQuantity,
    cancelledQuantity: state.monthsInformation.cancelledQuantity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFetchMonthInformation: (startDate, endDate) =>
      dispatch(actions.initFetchMonthInformation(startDate, endDate)),
    onInitSetMonthAndYear: (month, year) =>
      dispatch(actions.setMonthAndYearForMonthInformation(month, year))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthsInformation);
