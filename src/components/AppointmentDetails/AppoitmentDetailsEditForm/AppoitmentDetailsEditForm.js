import React, { Component } from "react";

import "./AppoitmentDetailsEditForm.scss";

class AppoitmentDetailsEditForm extends Component {
  state = {
    startTimeEditable: null,
    endTimeEditable: null,
    dateEditable: null,
    locationEditable: null,
    topicsEditable: null,
    enableButtons: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.isEditable !== prevProps.isEditable) {
      if (this.props.isEditable) {
        this.setState({
          startTimeEditable: true,
          endTimeEditable: true,
          dateEditable: true,
          locationEditable: true,
          topicsEditable: true,
          enableButtons: true
        });
      } else {
        this.setState({
          startTimeEditable: false,
          endTimeEditable: false,
          dateEditable: false,
          locationEditable: false,
          topicsEditable: false,
          enableButtons: false
        });
      }
    }
  }

  render() {
    return (
      <section className="appoitmentDetailsEditForm">
        <form className="appoitmentDetailsEditForm__form">
          {/* FORM INPUT */}
          <div className="appoitmentDetailsEditForm__form__label-block">
            <label
              className="appoitmentDetailsEditForm__form__label-block--label"
              htmlFor="appt"
            >
              Start Time
              <input
                type="time"
                id="appt"
                name="appt"
                min="9:00"
                max="18:00"
                required
                disabled={!this.state.startTimeEditable}
              />
            </label>
            <button
              className="appoitmentDetailsEditForm__form__label-block--button-edit"
              title="Edit"
            >
              <span className="fas fa-edit" aria-hidden="true" />
            </button>
          </div>

          <div className="appoitmentDetailsEditForm__form__label-block">
            <label
              className="appoitmentDetailsEditForm__form__label-block--label"
              htmlFor="appt"
            >
              End Time
              <input
                type="time"
                id="appt"
                name="appt"
                min="9:00"
                max="18:00"
                required
                disabled={!this.state.endTimeEditable}
              />
            </label>
            <button
              className="appoitmentDetailsEditForm__form__label-block--button-edit"
              title="Edit"
            >
              <span className="fas fa-edit" aria-hidden="true" />
            </button>
          </div>

          <div className="appoitmentDetailsEditForm__form__label-block">
            <label
              className="appoitmentDetailsEditForm__form__label-block--label"
              htmlFor="appt"
            >
              Date
              <input
                type="date"
                id="appt"
                name="appt"
                min="9:00"
                max="18:00"
                required
                disabled={!this.state.dateEditable}
              />
            </label>
            <button
              className="appoitmentDetailsEditForm__form__label-block--button-edit"
              title="Edit"
            >
              <span className="fas fa-edit" aria-hidden="true" />
            </button>
          </div>

          <div className="appoitmentDetailsEditForm__form__label-block">
            <label
              className="appoitmentDetailsEditForm__form__label-block--label"
              htmlFor="appt"
            >
              Location
              <input
                type="text"
                id="appt"
                name="appt"
                min="9:00"
                max="18:00"
                required
                disabled={!this.state.locationEditable}
              />
            </label>
            <button
              className="appoitmentDetailsEditForm__form__label-block--button-edit"
              title="Edit"
            >
              <span className="fas fa-edit" aria-hidden="true" />
            </button>
          </div>

          <div className="appoitmentDetailsEditForm__form__label-block">
            <label
              className="appoitmentDetailsEditForm__form__label-block--label"
              htmlFor="appt"
            >
              Topics
              <input
                type="text"
                id="appt"
                name="appt"
                min="9:00"
                max="18:00"
                required
                disabled={!this.state.topicsEditable}
              />
            </label>
            <button
              className="appoitmentDetailsEditForm__form__label-block--button-edit"
              title="Edit"
            >
              <span className="fas fa-edit" aria-hidden="true" />
            </button>
          </div>
          {/* END FORM INPUT */}
          <section
            className={[
              "appoitmentDetailsEditForm__form__buttons",
              !this.state.enableButtons ? "hide-buttons" : null
            ].join(" ")}
          >
            <div
              className={[
                "appoitmentDetailsEditForm__form__buttons__change-status-btns",
                this.props.statusAppointment === "confirmed"
                  ? "show-one-button-style"
                  : null
              ].join(" ")}
            >
              <button
                className={[
                  "appoitmentDetailsEditForm__form__buttons__change-status-btns--confirm",
                  this.props.statusAppointment === "confirmed"
                    ? "hide-buttons"
                    : null,
                  this.props.statusAppointment === "cancelled"
                    ? "hide-buttons"
                    : null
                ].join(" ")}
                title="Confirm Appointment"
              >
                Confirm Appointment
              </button>
              <button
                className={[
                  "appoitmentDetailsEditForm__form__buttons__change-status-btns--cancel",
                  this.props.statusAppointment === "cancelled"
                    ? "hide-buttons"
                    : null
                ].join(" ")}
                title="Cancel Appointment"
              >
                Cancel Appointment
              </button>
            </div>
            <button
              className="appoitmentDetailsEditForm__form__buttons--save-changes-btn"
              title="Save Changes"
            >
              Save Changes
            </button>
          </section>
        </form>
      </section>
    );
  }
}

export default AppoitmentDetailsEditForm;
