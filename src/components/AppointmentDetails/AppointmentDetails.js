import React, { Component } from "react";
import ReactDOM from "react-dom";

import userImage from "../../assets/user.jpg";
import "./AppointmentDetails.scss";
import AppoitmentDetailsEditForm from "./AppoitmentDetailsEditForm/AppoitmentDetailsEditForm";
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
    let attachedClasses = ["appointment-details", "close"];
    if (this.props.open) {
      attachedClasses = ["appointment-details", "open"];
    }

    let statusAppointment = null;
    if (this.props.appointment === "confirmed") {
      statusAppointment = "status-confirmed";
    } else if (this.props.appointment === "pending") {
      statusAppointment = "status-pending";
    } else if (this.props.appointment === "cancelled") {
      statusAppointment = "status-cancelled";
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
            {this.props.appointment}
          </h6>
          <div className="appointment-details__general-information__users-picture">
            <img src={userImage} alt="User" />
            <span className="fas fa-mug-hot" />
            <img src={userImage} alt="User" />
          </div>
          <h5 className="appointment-details__general-information--user-involved-name">
            Meghan Smith
          </h5>
          <h6 className="appointment-details__general-information--user-involved-phone">
            +1 (978) 711 - 05234
          </h6>
        </section>
        <section>
          <AppoitmentDetailsEditForm
            statusAppointment={this.props.appointment}
            isEditable={this.props.isEditable ? this.props.isEditable : false}
          />
        </section>
      </section>
    );
  }
}

export default AppointmentDetails;
