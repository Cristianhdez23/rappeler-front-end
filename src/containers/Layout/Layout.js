import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Header from "../../components/Header/Header";
import NotificationBox from "../../components/NotificationBox/NotificationBox";
//Actions
import * as actions from "../HomePage/HomePageActions";
//Style Files
import "./Layout.scss";

class Layout extends Component {
  state = {
    openNotificationBox: false,
    numberOfNotifications: 0,
    appointmentCreated: false,
    appointmentUpdated: false,
    appointmentStatusChanged: false,

    setWrapperRef: this.setWrapperRef,
    handleClickOutside: this.handleClickOutside
  };

  componentDidMount() {
    this.props.onInitFetchUserData();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.createAppointmentSucess) {
        this.setState({
          numberOfNotifications: this.state.numberOfNotifications + 1,
          appointmentCreated: true,
          appointmentUpdated: false,
          appointmentStatusChanged: false
        });
      }
      if (this.props.updateSuccess) {
        this.setState({
          numberOfNotifications: this.state.numberOfNotifications + 1,
          appointmentCreated: false,
          appointmentUpdated: true,
          appointmentStatusChanged: false
        });
      }

      if (this.props.requestChangeStatusSuccessful) {
        this.setState({
          numberOfNotifications: this.state.numberOfNotifications + 1,
          appointmentCreated: false,
          appointmentUpdated: false,
          appointmentStatusChanged: true
        });
      }
    }
  }

  openOrCloseNotificationBox = () => {
    this.setState(prevState => {
      return {
        openNotificationBox: !prevState.openNotificationBox,
        numberOfNotifications: 0,
        appointmentCreated: false,
        appointmentUpdated: false,
        appointmentStatusChanged: false
      };
    });
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.openOrCloseNotificationBox();
    }
  };
  // ref={this.setWrapperRef}
  render() {
    return (
      <>
        <Toolbar
          onClickNotificationHandler={this.openOrCloseNotificationBox}
          numberOfNotifications={this.state.numberOfNotifications}
        />
        <Header userInformation={this.props.userInformation} />
        <NotificationBox
          show={this.state.openNotificationBox}
          appointmentCreated={this.state.appointmentCreated}
          appointmentUpdated={this.state.appointmentUpdated}
          appointmentStatusChanged={this.state.appointmentStatusChanged}
          refItem={this.setWrapperRef}
        />
        <main className="main-content">{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInformation: state.homePage.userInformation,
    error: state.homePage.userInformation,
    requestChangeStatusSuccessful: state.appointmentSection.requestSuccessful,
    updateSuccess: state.homePage.updateSuccess,
    createAppointmentSucess: state.homePage.createAppointmentSucess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFetchUserData: () => dispatch(actions.initUserData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
