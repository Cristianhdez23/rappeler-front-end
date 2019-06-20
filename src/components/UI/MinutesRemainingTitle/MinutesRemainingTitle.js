import React, { Component } from "react";

//Util Functions
import { minutesLeft } from "../../../utils/Functions";

class MinutesRemainingTitle extends Component {
  state = {
    minutes: 0
  };

  tick(date) {
    if (date) {
      let minDiff = minutesLeft(date);
      this.setState(prevState => ({
        minutes: minDiff
      }));
    } else {
      clearInterval(this.interval);
    }
  }

  componentDidMount() {
    if (this.props.appointmentData.length > 0) {
      let minDiff = minutesLeft(this.props.appointmentData[0].startdate);
      this.setState({ minutes: minDiff });
      clearInterval(this.interval);
      let date = this.props.appointmentData[0].startdate;
      if (this.props.appointmentData[0].startdate) {
        this.interval = setInterval(() => this.tick(date), 60000);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appointmentData !== this.props.appointmentData) {
      if (this.props.appointmentData && this.props.appointmentData.length > 0) {
        let minDiff = minutesLeft(this.props.appointmentData[0].startdate);
        this.setState({ minutes: minDiff });
        clearInterval(this.interval);
        let date = this.props.appointmentData[0].startdate;
        if (this.props.appointmentData[0].startdate) {
          this.interval = setInterval(() => this.tick(date), 60000);
        }
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.props.appointmentData.length === 0) {
      return <></>;
    }
    return (
      <h5 className="detail-container__appointments__today-block__information--meeting-time" role="timer">
        Meeting in {this.state.minutes} minutes
      </h5>
    );
  }
}

export default MinutesRemainingTitle;
