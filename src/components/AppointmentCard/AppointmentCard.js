import React from "react";

import "./AppointmentCard.scss";
import userImage from "../../assets/user.jpg";

const appointmentCard = props => {
  let instanceAppointment = props.status;

  let statusColorBorder = null,
    statusColorFont = null,
    cancelledStatus = null,
    isStatusConfirmed = null;

  if (props.status === "confirmed") {
    statusColorBorder = "border-left-confirmed";
    statusColorFont = "status-confirmed";
    isStatusConfirmed = true;
  } else if (props.status === "pending") {
    statusColorBorder = "border-left-pending";
    statusColorFont = "status-pending";
  } else if (props.status === "cancelled") {
    statusColorBorder = "border-left-cancelled";
    statusColorFont = "status-cancelled";
    cancelledStatus = "cancelled-color";
  }

  return (
    <article
      className={["appointment-card__container", statusColorBorder].join(" ")}
      role="button"
      tabIndex="0"
      onKeyDown={e => {
        if (e.keyCode === 13) {
          props.onClickCard(instanceAppointment);
        }
      }}
      onClick={() => props.onClickCard(instanceAppointment)}
    >
      <section className="appointment-card__container__time-block">
        <h5
          className={[
            "appointment-card__container__time-block--appointment-time",
            cancelledStatus
          ].join(" ")}
        >
          3:30 PM
        </h5>
        <h6 className="appointment-card__container__time-block--time-remaining">
          30 minutes
        </h6>
      </section>
      <section className="appointment-card__container__guest-details">
        <div className="appointment-card__container__guest-details__image-block">
          <img className={cancelledStatus} src={userImage} alt="User" />
        </div>
        <div className="appointment-card__container__guest-details__details-block">
          <h5
            className={[
              "appointment-card__container__guest-details__details-block--name",
              cancelledStatus
            ].join(" ")}
          >
            PEPITO SANCHEZ
          </h5>
          <h6 className="appointment-card__container__guest-details__details-block--location">
            <span className="fas fa-map-marker-alt" />
            Inperium Cafe
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
          September 10th
        </h5>
        <h6
          className={[
            "appointment-card__container__date-details--status",
            statusColorFont
          ].join(" ")}
        >
          <span className="fas fa-circle" />
          {props.status}
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
                props.onClickCard(instanceAppointment);
              }
            }}
            onClick={e => props.onClickEditCard(e, instanceAppointment)}
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
          >
            <span className="fas fa-check" />
          </button>
        </div>
        <div className="appointment-card__container__buttons-block__btn">
          <button
            className="appointment-card__container__buttons-block__btn--btn"
            title="Cancel"
            disabled={cancelledStatus}
          >
            <span className="fas fa-times" />
          </button>
        </div>
      </section>
    </article>
  );
};

export default appointmentCard;
