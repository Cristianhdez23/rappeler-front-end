import React, { Component } from "react";

import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SectionSpinner from "../UI/Spinner/SectionSpinner/SectionSpinner";
import "./AppointmentsForTodaySection.scss";
import NoAppointments from "../UI/NoAppointments/NoAppointments";

import { minutesLeft } from "../../utils/Functions";

class AppointmentsForTodaySection extends Component {
  state = {
    seconds: 0
  };

  tick(date) {
    let minDiff = minutesLeft(date);
    this.setState(prevState => ({
      seconds: minDiff
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.appointmentsData !== this.props.appointmentsData) {
      if (this.props.appointmentsData) {
        let minDiff = minutesLeft(this.props.appointmentsData[0].startdate);
        this.setState({ seconds: minDiff });
        this.interval = setInterval(
          () => this.tick(this.props.appointmentsData[0].startdate),
          60000
        );
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let appointmentsForToday = <SectionSpinner />;
    let minutesRemainding = null;
    if (this.props.appointmentsData) {
      appointmentsForToday = this.props.appointmentsData.map(
        (appointment, index) => {
          return (
            <AppointmentCard
              key={index}
              onClickCard={this.props.onClickCard}
              appointmentData={appointment}
              onClickEditCard={this.props.onClickEditCard}
            />
          );
        }
      );

      minutesRemainding = (
        <h5 className="detail-container__appointments__today-block__information--meeting-time">
          Meeting in {this.state.seconds} minutes
        </h5>
      );
    }

    if (appointmentsForToday.length === 0) {
      appointmentsForToday = <NoAppointments />;
    }

    return (
      <>
        <div className="detail-container__appointments__today-block__information">
          <h2 className="detail-container__appointments__today-block__information--today-title">
            Today
          </h2>
          {minutesRemainding}
        </div>
        {appointmentsForToday}
      </>
    );
  }
}

export default AppointmentsForTodaySection;
