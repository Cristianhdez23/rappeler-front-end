import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./AppointmentDetails.scss";
import AppoitmentDetailsEditForm from "./AppoitmentDetailsEditForm/AppoitmentDetailsEditForm";
import SectionSpinner from "../UI/Spinner/SectionSpinner/SectionSpinner";
class AppointmentDetails extends Component {
  state = {};

  componentDidUpdate() {
    // this.nameInput.focus();
    const element = ReactDOM.findDOMNode(this);
    if (element != null) {
      element.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  render() {
    let title = null;
    let attachedClasses = ["appointment-details", "close"];
    if (this.props.open) {
      attachedClasses = ["appointment-details", "open"];
    }
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
      <section className={attachedClasses.join(" ")}>
        <button
          className="close-button"
          title="Close"
          onClick={this.props.onClickCloseDetails}
          // ref={input => {
          //   this.nameInput = input;
          // }}
        >
          <span className="fas fa-times" />
        </button>

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
      </section>
    );
  }
}

export default AppointmentDetails;
