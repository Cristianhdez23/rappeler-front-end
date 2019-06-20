import React, { Component } from "react";

//Components
import EditAppointmentForm from "./EditAppointmentForm/EditAppointmentForm";
import SectionSpinner from "../UI/Spinner/SectionSpinner/SectionSpinner";
//Util Functions
import { destructureDateFormat } from "../../utils/Functions";
// Style files
import "./EditAppointment.scss";

class EditAppointment extends Component {
  componentDidMount() {
    let startDateFormatedArray = destructureDateFormat(
      this.props.instanceForAppointmentDetails.startdate
    );
    let endDateFormatedArray = destructureDateFormat(
      this.props.instanceForAppointmentDetails.enddate
    );
    let topics = [];
    this.props.instanceForAppointmentDetails.topics.map(topic => {
      return topics.push(" " + topic.topic);
    });

    let promise = new Promise((resolve, reject) => {
      if (true) {
        resolve("Promise resolved successfully");
      }
    });

    promise.then(result => {
      this.props.inputChangedHandler(
        null,
        "startDate",
        startDateFormatedArray[0]
      );
      this.props.inputChangedHandler(
        null,
        "startTime",
        startDateFormatedArray[1]
      );
      this.props.inputChangedHandler(null, "endDate", endDateFormatedArray[0]);
      this.props.inputChangedHandler(null, "endTime", endDateFormatedArray[1]);
      this.props.inputChangedHandler(null, "topics", topics.join());
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.instanceForAppointmentDetails !==
      this.props.instanceForAppointmentDetails
    ) {
      let startDateFormatedArray = destructureDateFormat(
        this.props.instanceForAppointmentDetails.startdate
      );
      let endDateFormatedArray = destructureDateFormat(
        this.props.instanceForAppointmentDetails.enddate
      );
      let topics = [];
      this.props.instanceForAppointmentDetails.topics.map(topic => {
        return topics.push(" " + topic.topic);
      });

      let promise = new Promise((resolve, reject) => {
        if (true) {
          resolve();
        }
      });

      promise.then(result => {
        this.props.inputChangedHandler(
          null,
          "startDate",
          startDateFormatedArray[0]
        );
        this.props.inputChangedHandler(
          null,
          "startTime",
          startDateFormatedArray[1]
        );
        this.props.inputChangedHandler(
          null,
          "endDate",
          endDateFormatedArray[0]
        );
        this.props.inputChangedHandler(
          null,
          "endTime",
          endDateFormatedArray[1]
        );
        this.props.inputChangedHandler(null, "topics", topics.join());
      });
    }
  }

  render() {
    let title = null;
    let statusAppointment = null;
    if (this.props.instanceForAppointmentDetails) {
      if (this.props.instanceForAppointmentDetails.status === "confirmed") {
        statusAppointment = "status-confirmed";
      } else if (
        this.props.instanceForAppointmentDetails.status === "pending"
      ) {
        statusAppointment = "status-pending";
      } else if (
        this.props.instanceForAppointmentDetails.status === "cancelled"
      ) {
        statusAppointment = "status-cancelled";
      }

      title = `${this.props.instanceForAppointmentDetails.first_name} ${
        this.props.instanceForAppointmentDetails.last_name
      }`;
    } else {
      return (
        <section>
          <SectionSpinner />
        </section>
      );
    }

    return (
      <>
        <section className="edit-appointment-information">
          <h3 className="edit-appointment-information--title">
            Appointment Details
          </h3>
          <h6
            className={[
              "edit-appointment-information--status",
              statusAppointment
            ].join(" ")}
          >
            <span className="fas fa-circle" aria-hidden="true" />
            {this.props.instanceForAppointmentDetails.status}
          </h6>
          <div className="edit-appointment-information__users-picture" role="img" aria-label="Users profile pictures">
            <img src={this.props.userAvatar.avatar} alt="User" />
            <span className="fas fa-mug-hot" />
            <img
              src={this.props.instanceForAppointmentDetails.avatar}
              alt="User"
            />
          </div>
          <h5 className="edit-appointment-information--user-involved-name">
            {title}
          </h5>
          <h6 className="edit-appointment-information--user-involved-phone">
            {this.props.instanceForAppointmentDetails.phone}
          </h6>
        </section>
        <EditAppointmentForm
          appointmentInformation={this.props.instanceForAppointmentDetails}
          editAppointmentHandler={this.props.editAppointmentHandler}
          editAppointmentForm={this.props.editAppointmentForm}
          inputChangedHandler={this.props.inputChangedHandler}
          isEditable={this.props.editableContentAppointmentDetails}
          formIsValid={this.props.formIsValid}
        />
      </>
    );
  }
}

export default EditAppointment;
