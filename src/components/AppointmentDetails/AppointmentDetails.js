import React, { Component } from "react";
import ReactDOM from "react-dom";

// Style files
import "./AppointmentDetails.scss";

class AppointmentDetails extends Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.instanceForAppointmentDetails !==
      this.props.instanceForAppointmentDetails
    ) {
      const element = ReactDOM.findDOMNode(this);
      if (element != null) {
        element.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  }

  render() {
    let attachedClasses = ["appointment-details", "close"];
    if (this.props.open) {
      attachedClasses = ["appointment-details", "open"];
    }

    return (
      <section className={attachedClasses.join(" ")}>
        <button
          className="close-button"
          title="Close"
          onClick={this.props.onClickCloseDetails}
          aria-label="Close"
        >
          <span className="fas fa-times" />
        </button>
        {this.props.children}
      </section>
    );
  }
}

export default AppointmentDetails;
