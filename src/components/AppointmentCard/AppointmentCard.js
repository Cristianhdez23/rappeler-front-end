import React from "react";

// Components
import Spinner from "../UI/Spinner/Spinner";
// Helper Functions
import {
  transformTime,
  findMonth,
  getDurationAppointment
} from "../../utils/Functions";
// Style files
import "./AppointmentCard.scss";

const appointmentCard = props => {
  let statusColorBorder = null,
    statusColorFont = null,
    cancelledStatus = null,
    isStatusConfirmed = null,
    startTime = null,
    startDate = null,
    title = null,
    endTime = null;

  if (props.appointmentData) {
    startDate = findMonth(new Date(props.appointmentData.startdate));
    startTime = transformTime(props.appointmentData.startdate.split(" ")[1]);
    endTime = getDurationAppointment(
      props.appointmentData.startdate,
      props.appointmentData.enddate
    );
    title = `${props.appointmentData.first_name} ${
      props.appointmentData.last_name
    }`;

    if (props.appointmentData.status === "confirmed") {
      statusColorBorder = "border-left-confirmed";
      statusColorFont = "status-confirmed";
      isStatusConfirmed = true;
    } else if (props.appointmentData.status === "pending") {
      statusColorBorder = "border-left-pending";
      statusColorFont = "status-pending";
    } else if (props.appointmentData.status === "cancelled") {
      statusColorBorder = "border-left-cancelled";
      statusColorFont = "status-cancelled";
      cancelledStatus = "cancelled-color";
    }
  } else {
    return <Spinner />;
  }

  return (
    <article
      className={["appointment-card__container", statusColorBorder].join(" ")}
      role="button"
      tabIndex="0"
      title="Basic Appointment Information"
      onKeyDown={e => {
        if (e.keyCode === 13) {
          props.onClickCard(props.appointmentData);
        }
      }}
      onClick={() => props.onClickCard(props.appointmentData)}
    >
      <section className="appointment-card__container__time-block">
        <h5
          className={[
            "appointment-card__container__time-block--appointment-time",
            cancelledStatus
          ].join(" ")}
        >
          {startTime}
        </h5>
        <h6 className="appointment-card__container__time-block--time-remaining">
          {endTime}
        </h6>
      </section>
      <section className="appointment-card__container__guest-details">
        <div className="appointment-card__container__guest-details__image-block">
          <img
            className={cancelledStatus}
            src={props.appointmentData.avatar}
            alt="User"
          />
        </div>
        <div className="appointment-card__container__guest-details__details-block">
          <h5
            className={[
              "appointment-card__container__guest-details__details-block--name",
              cancelledStatus
            ].join(" ")}
          >
            {title}
          </h5>
          <h6 className="appointment-card__container__guest-details__details-block--location">
            <span className="fas fa-map-marker-alt" />
            {props.appointmentData.location[0].place}
          </h6>
        </div>
      </section>
      <section className="appointment-card__container__date-details">
        <h5
          className={[
            "appointment-card__container__date-details--date",
            cancelledStatus
          ].join(" ")}
        >
          {startDate}
        </h5>
        <h6
          className={[
            "appointment-card__container__date-details--status",
            statusColorFont
          ].join(" ")}
        >
          <span className="fas fa-circle" />
          {props.appointmentData.status}
        </h6>
      </section>
      <section className="appointment-card__container__buttons-block">
        <div
          className={[
            "appointment-card__container__buttons-block__btn",
            isStatusConfirmed ? null : "hide-buttons"
          ].join(" ")}
        >
          <button
            className="appointment-card__container__buttons-block__btn--btn"
            title="Edit"
            onKeyDown={e => {
              if (e.keyCode === 13) {
                props.onClickCard(props.appointmentData);
              }
            }}
            onClick={e => props.onClickEditCard(e, props.appointmentData)}
            aria-label="Edit"
          >
            <span className="fas fa-edit" />
          </button>
        </div>
        <div
          className={[
            "appointment-card__container__buttons-block__btn",
            isStatusConfirmed ? "hide-buttons" : null
          ].join(" ")}
        >
          <button
            className="appointment-card__container__buttons-block__btn--btn"
            title="Confirm"
            disabled={cancelledStatus}
            onClick={event =>
              props.confirmedAppointment(event, props.appointmentData)
            }
            aria-label="Confirm"
          >
            <span className="fas fa-check" />
          </button>
        </div>
        <div className="appointment-card__container__buttons-block__btn">
          <button
            className="appointment-card__container__buttons-block__btn--btn"
            title="Cancel"
            disabled={cancelledStatus}
            onClick={event =>
              props.cancelAppointment(event, props.appointmentData)
            }
            aria-label="Cancel"
          >
            <span className="fas fa-times" />
          </button>
        </div>
      </section>
    </article>
  );
};

export default appointmentCard;
