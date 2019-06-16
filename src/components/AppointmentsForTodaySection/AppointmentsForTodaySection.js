import React from "react";

import AppointmentCard from "../AppointmentCard/AppointmentCard";
import SectionSpinner from "../UI/Spinner/SectionSpinner/SectionSpinner";
import "./AppointmentsForTodaySection.scss";
import NoAppointments from "../UI/NoAppointments/NoAppointments";

import { filterAppointments } from "../../utils/Functions";
import MinutesRemainingTitle from "../UI/MinutesRemainingTitle/MinutesRemainingTitle";

const appointmentsForTodaySection = props => {
  let {
    allButtonClicked,
    pendingButtonClicked,
    confirmedButtonClicked,
    cancelledButtonClicked
  } = props;

  let appointmentsForToday = <SectionSpinner />;
  let minutesRemaining = null;
  let filteredAppointments = null;
  if (props.appointmentsData) {
    filteredAppointments = props.appointmentsData;
    filteredAppointments = filterAppointments(
      filteredAppointments,
      allButtonClicked,
      confirmedButtonClicked,
      pendingButtonClicked,
      cancelledButtonClicked
    );

    appointmentsForToday = filteredAppointments.map((appointment, index) => {
      return (
        <AppointmentCard
          key={index}
          onClickCard={props.onClickCard}
          appointmentData={appointment}
          onClickEditCard={props.onClickEditCard}
        />
      );
    });
    minutesRemaining = (
      <MinutesRemainingTitle appointmentData={filteredAppointments} />
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
        {minutesRemaining}
      </div>
      {appointmentsForToday}
    </>
  );
};

export default appointmentsForTodaySection;
