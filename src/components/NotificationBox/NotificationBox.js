import React, { Component } from "react";

import NotificationItem from "./NotificationItem/NotificationItem";
import "./NotificationBox.scss";
class NotificationBox extends Component {
  state = {
    notifications: []
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.appointmentCreated !== this.props.appointmentCreated ||
      prevProps.appointmentUpdated !== this.props.appointmentUpdated ||
      prevProps.appointmentStatusChanged !== this.props.appointmentStatusChanged
    ) {
      let notification = [...this.state.notifications];
      if (this.props.appointmentCreated) {
        notification.push("create");
      } else if (this.props.appointmentUpdated) {
        notification.push("update");
      } else if (this.props.appointmentStatusChanged) {
        notification.push("statusChange");
      }
      this.setState({ notifications: notification });
    }
  }

  render() {
    if (!this.props.show) {
      return <></>;
    }
    let notificationItem = null;
    notificationItem = this.state.notifications.map((notification, index) => {
      return <NotificationItem key={index} status={notification} />;
    });

    return (
      <div className="notification-box" ref={this.props.refItem}>
        <h4 className="notification-box--title">Notifications</h4>
        <ul className="notification-box__list">{notificationItem.reverse()}</ul>
      </div>
    );
  }
}

export default NotificationBox;
