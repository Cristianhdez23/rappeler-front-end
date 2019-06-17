import React, { Component } from "react";
import AppoitmentDetailsEditForm from "../AppointmentDetails/AppoitmentDetailsEditForm/AppoitmentDetailsEditForm";
import SectionSpinner from "../UI/Spinner/SectionSpinner/SectionSpinner";
class EditAppointment extends Component {
  state = {};
  render() {
    let attachedClasses = ["appointment-details", "close"];
    if (this.props.open) {
      attachedClasses = ["appointment-details", "open"];
    }
    let title = null;
    let statusAppointment = null;
    if (this.props.appointment && this.props.userAvatar) {
      if (this.props.appointment.status === "confirmed") {
        statusAppointment = "status-confirmed";
      } else if (this.props.appointment.status === "pending") {
        statusAppointment = "status-pending";
      } else if (this.props.appointment.status === "cancelled") {
        statusAppointment = "status-cancelled";
      }

      title = `${this.props.appointment.first_name} ${
        this.props.appointment.last_name
      }`;
    } else {
      return (
        <section className={attachedClasses.join(" ")}>
          <SectionSpinner />
        </section>
      );
    }
    return (
      <>
        <section className="appointment-details__general-information">
          <h3 className="appointment-details__general-information--title">
            Appointment Details
          </h3>
          <h6
            className={[
              "appointment-details__general-information--status",
              statusAppointment
            ].join(" ")}
          >
            <span className="fas fa-circle" aria-hidden="true" />
            {this.props.appointment.status}
          </h6>
          <div className="appointment-details__general-information__users-picture">
            <img src={this.props.userAvatar.avatar} alt="User" />
            <span className="fas fa-mug-hot" />
            <img src={this.props.appointment.avatar} alt="User" />
          </div>
          <h5 className="appointment-details__general-information--user-involved-name">
            {title}
          </h5>
          <h6 className="appointment-details__general-information--user-involved-phone">
            {this.props.appointment.phone}
          </h6>
        </section>
        <section>
          <AppoitmentDetailsEditForm
            statusAppointment={this.props.appointment.status}
            isEditable={this.props.isEditable ? this.props.isEditable : false}
          />
        </section>
      </>
    );
  }
}

export default EditAppointment;
