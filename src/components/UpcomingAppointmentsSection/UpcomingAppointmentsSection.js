import React, { Component } from "react";

import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SectionSpinner from "../UI/Spinner/SectionSpinner/SectionSpinner";
import "./UpcomingAppointmentsSection.scss";

class UpcomingAppointmentsSection extends Component {
  render() {
    let upcomingAppointments = <SectionSpinner />;
    let dontShowButton = true;
    
    if (this.props.appointmentsData.length > 0) {
      dontShowButton = false;
      upcomingAppointments = this.props.appointmentsData.map(
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
    }
    return (
      <>
        <h2 className="detail-container__appointments__upcoming-block--today-title">
          Upcoming
        </h2>
        {upcomingAppointments}
        <div
          className={[
            "view-more-appintments-btn-block",
            dontShowButton ? "hide" : null
          ].join(" ")}
        >
          <button
            className="view-more-appintments-btn-block--btn"
            title="Load More Appointments"
            onClick={this.props.loadMoreAppointments}
          >
            Load More Appointments
          </button>
        </div>
      </>
    );
  }
}

export default UpcomingAppointmentsSection;
