import React, { Component } from "react";
import { connect } from "react-redux";

//Component
import MonthsInformation from "../MonthsInformation/MonthsInformation";
import FilterBar from "../../components/FilterBar/FilterBar";
import AppointmentsForToday from "../../components/AppointmentsForTodaySection/AppointmentsForTodaySection";
import UpcomingAppointmentsSection from "../../components/UpcomingAppointmentsSection/UpcomingAppointmentsSection";
import Modal from "../../components/UI/Modal/Modal";
//Actions
import * as actions from "./AppointmentSectionActions";
import * as actionsHomePage from "../HomePage/HomePageActions";

class AppointmentSection extends Component {
  state = {
    allButtonClicked: true,
    confirmedButtonClicked: false,
    pendingButtonClicked: false,
    cancelledButtonClicked: false,
    confirmedAppointment: false,
    cancelAppointment: false,
    appointmentData: null
  };

  componentDidUpdate() {
    if (
      !this.state.confirmedButtonClicked &&
      !this.state.pendingButtonClicked &&
      !this.state.cancelledButtonClicked &&
      !this.state.allButtonClicked
    ) {
      this.setState({ allButtonClicked: true });
    }
    if (this.props.requestSuccessful) {
      this.props.setFalseStateRequestSuccessful();
      this.props.onInitFetchAppointmentForTodayData();
      this.props.onInitFetchUpcomingAppointmentData(null, null);
      this.props.resetUpcomingData();
      this.closeModal();
    }
  }

  allButtonClickedHandler = event => {
    if (this.state.confirmedButtonClicked) {
      this.setState({ confirmedButtonClicked: false });
    }
    if (this.state.pendingButtonClicked) {
      this.setState({ pendingButtonClicked: false });
    }
    if (this.state.cancelledButtonClicked) {
      this.setState({ cancelledButtonClicked: false });
    }
    this.setState({ allButtonClicked: true });
    event.target.blur();
  };

  confirmedButtonClickedHandler = event => {
    if (this.state.allButtonClicked) {
      this.setState({ allButtonClicked: false });
    }
    this.setState({
      confirmedButtonClicked: !this.state.confirmedButtonClicked
    });
    event.target.blur();
  };

  pendingButtonClickedHandler = event => {
    if (this.state.allButtonClicked) {
      this.setState({ allButtonClicked: false });
    }
    this.setState({ pendingButtonClicked: !this.state.pendingButtonClicked });
    event.target.blur();
  };

  cancelledButtonClickedHandler = event => {
    if (this.state.allButtonClicked) {
      this.setState({ allButtonClicked: false });
    }
    this.setState({
      cancelledButtonClicked: !this.state.cancelledButtonClicked
    });
    event.target.blur();
  };

  confirmedAppointmentHandler = (event, appointmentData) => {
    event.stopPropagation();
    this.setState({
      confirmedAppointment: true,
      appointmentData: appointmentData
    });
  };

  cancelAppointmentHandler = (event, appointmentData) => {
    event.stopPropagation();
    this.setState({
      cancelAppointment: true,
      appointmentData: appointmentData
    });
  };

  closeModal = () => {
    this.setState({
      confirmedAppointment: false,
      cancelAppointment: false,
      appointmentData: null
    });
  };

  changeAppointmentStatusToConfirmed = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onInitChangeAppointmentStatus(
      this.state.appointmentData,
      "confirmed"
    );
  };

  changeAppointmentStatusToCancelled = event => {
    event.stopPropagation();
    this.props.onInitChangeAppointmentStatus(
      this.state.appointmentData,
      "cancelled"
    );
  };

  render() {
    return (
      <>
        <Modal
          open={
            this.state.confirmedAppointment
              ? this.state.confirmedAppointment
              : this.state.cancelAppointment
          }
          closed={this.closeModal}
          isConfirmed={this.state.confirmedAppointment}
          isCancelled={this.state.cancelAppointment}
          changeToConfirmed={this.changeAppointmentStatusToConfirmed}
          changeToCancelled={this.changeAppointmentStatusToCancelled}
        />
        <section className="month-information-mobile">
          <MonthsInformation mobileVersion />
        </section>
        <FilterBar
          onClickAllButton={this.allButtonClickedHandler}
          onClickConfirmedButton={this.confirmedButtonClickedHandler}
          onClickPendingButton={this.pendingButtonClickedHandler}
          onClickCancelledButton={this.cancelledButtonClickedHandler}
          allButtonState={this.state.allButtonClicked}
          confirmedButtonState={this.state.confirmedButtonClicked}
          pendingButtonState={this.state.pendingButtonClicked}
          cancelledButtonState={this.state.cancelledButtonClicked}
          onClickAddAppointment={this.props.onClickOpenCreateAppointmentHandler}
        />
        <section className="detail-container__appointments">
          <section className="detail-container__appointments__today-block">
            <AppointmentsForToday
              appointmentsData={this.props.appointmentsForToday}
              onClickCard={this.props.onClickOpenCardHandler}
              onClickEditCard={this.props.onClickOpenEditCardHandler}
              allButtonClicked={this.state.allButtonClicked}
              confirmedButtonClicked={this.state.confirmedButtonClicked}
              pendingButtonClicked={this.state.pendingButtonClicked}
              cancelledButtonClicked={this.state.cancelledButtonClicked}
              confirmedAppointment={this.confirmedAppointmentHandler}
              cancelAppointment={this.cancelAppointmentHandler}
            />
          </section>
          <section className="detail-container__appointments__upcoming-block">
            <UpcomingAppointmentsSection
              appointmentsData={this.props.upcomingAppointments}
              onClickCard={this.props.onClickOpenCardHandler}
              onClickEditCard={this.props.onClickOpenEditCardHandler}
              loadMoreAppointments={this.props.loadMoreAppointmentsHandler}
              allButtonClicked={this.state.allButtonClicked}
              confirmedButtonClicked={this.state.confirmedButtonClicked}
              pendingButtonClicked={this.state.pendingButtonClicked}
              cancelledButtonClicked={this.state.cancelledButtonClicked}
              confirmedAppointment={this.confirmedAppointmentHandler}
              cancelAppointment={this.cancelAppointmentHandler}
            />
          </section>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    requestSuccessful: state.appointmentSection.requestSuccessful
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitChangeAppointmentStatus: (appointmentData, newStatus) =>
      dispatch(actions.initChangeAppointmentStatus(appointmentData, newStatus)),
    setFalseStateRequestSuccessful: () =>
      dispatch(actions.setFalseStateRequestSuccessful()),
    onInitFetchAppointmentForTodayData: () =>
      dispatch(actionsHomePage.initFetchAppointmentsForTodayData()),
    onInitFetchUpcomingAppointmentData: (start, end) =>
      dispatch(actionsHomePage.initFetchUpcomingAppointmentsData(start, end))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentSection);
