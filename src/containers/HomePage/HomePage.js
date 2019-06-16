import React, { Component } from "react";
import { connect } from "react-redux";

import FilterBar from "../../components/FilterBar/FilterBar";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import AppointmentsForToday from "../../components/AppointmentsForTodaySection/AppointmentsForTodaySection";

import "./HomePage.scss";
import MonthsInformation from "../MonthsInformation/MonthsInformation";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";

import * as actions from "./HomePageActions";
import UpcomingAppointmentsSection from "../../components/UpcomingAppointmentsSection/UpcomingAppointmentsSection";

import {
  queryDayAfter,
  calculateDateIn2Days,
  calculateDateIn1Day
} from "../../utils/Functions";

class HomePage extends Component {
  state = {
    allButtonClicked: true,
    confirmedButtonClicked: false,
    pendingButtonClicked: false,
    cancelledButtonClicked: false,

    showSideDrawer: false,

    openAppointmentDetails: false,
    instanceForAppointmentDetails: null,
    editableContentAppointmentDetails: false,

    startNumberOfUpcomingData: null,
    endNumberOfUpcomingData: null,
    canLoadMoreData: true
  };

  componentDidMount() {
    this.props.onInitFetchAppointmentForTodayData();
    this.props.onInitFetchUpcomingAppointmentData(
      this.state.startNumberOfUpcomingData,
      this.state.endNumberOfUpcomingData
    );

    this.setState({
      startNumberOfUpcomingData: calculateDateIn1Day(queryDayAfter),
      endNumberOfUpcomingData: calculateDateIn2Days(queryDayAfter)
    });
  }

  componentDidUpdate() {
    if (
      !this.state.confirmedButtonClicked &&
      !this.state.pendingButtonClicked &&
      !this.state.cancelledButtonClicked &&
      !this.state.allButtonClicked
    ) {
      this.setState({ allButtonClicked: true });
    }
  }

  loadMoreAppointmentsHandler = event => {
    event.target.blur();
    this.props.onInitFetchUpcomingAppointmentData(
      this.state.startNumberOfUpcomingData,
      this.state.endNumberOfUpcomingData
    );

    this.setState({
      startNumberOfUpcomingData: this.state.endNumberOfUpcomingData,
      endNumberOfUpcomingData: calculateDateIn2Days(
        this.state.endNumberOfUpcomingData
      )
    });
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  // Filter Buttons
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
  // End Filter Buttons

  // onClickEvents Handlers

  onClickOpenCardHandler = instanceAppointment => {
    console.log(instanceAppointment);
    this.setState({ instanceForAppointmentDetails: instanceAppointment });
    this.setState({ openAppointmentDetails: true });
    this.setState({ editableContentAppointmentDetails: false });
  };

  onClickCloseCardHandler = () => {
    this.setState({ instanceForAppointmentDetails: null });
    this.setState({ openAppointmentDetails: false });
  };

  onClickOpenEditCardHandler = (e, instanceAppointment) => {
    e.stopPropagation();
    this.setState({ instanceForAppointmentDetails: instanceAppointment });
    this.setState({ openAppointmentDetails: true });
    this.setState({ editableContentAppointmentDetails: true });
  };

  render() {    
    return (
      <main className="homePage">
        <SideDrawer
          open={this.state.openAppointmentDetails}
          closed={this.onClickCloseCardHandler}
        >
          <AppointmentDetails
            appointment={this.state.instanceForAppointmentDetails}
            open={this.state.openAppointmentDetails}
            onClickCloseDetails={this.onClickCloseCardHandler}
            isEditable={this.state.editableContentAppointmentDetails}
            userAvatar={this.props.userInformation}
          />
        </SideDrawer>
        <section className="detail-container">
          <section className="month-information-mobile">
            <MonthsInformation mobileVersion/>
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
          />
          <section className="detail-container__appointments">
            <section className="detail-container__appointments__today-block">
              <AppointmentsForToday
                appointmentsData={this.props.appointmentsForToday}
                onClickCard={this.onClickOpenCardHandler}
                onClickEditCard={this.onClickOpenEditCardHandler}
                allButtonClicked={this.state.allButtonClicked}
                confirmedButtonClicked={this.state.confirmedButtonClicked}
                pendingButtonClicked={this.state.pendingButtonClicked}
                cancelledButtonClicked={this.state.cancelledButtonClicked}
              />
            </section>
            <section className="detail-container__appointments__upcoming-block">
              <UpcomingAppointmentsSection
                appointmentsData={this.props.upcomingAppointments}
                onClickCard={this.onClickOpenCardHandler}
                onClickEditCard={this.onClickOpenEditCardHandler}
                loadMoreAppointments={this.loadMoreAppointmentsHandler}
                allButtonClicked={this.state.allButtonClicked}
                confirmedButtonClicked={this.state.confirmedButtonClicked}
                pendingButtonClicked={this.state.pendingButtonClicked}
                cancelledButtonClicked={this.state.cancelledButtonClicked}
              />
            </section>
          </section>
        </section>

        <aside className="aside-container">
          <section className="aside-container__month-information">
          <MonthsInformation />
          </section>
          <section className="aside-container__appointment-detail">
            <AppointmentDetails
              appointment={this.state.instanceForAppointmentDetails}
              open={this.state.openAppointmentDetails}
              onClickCloseDetails={this.onClickCloseCardHandler}
              isEditable={this.state.editableContentAppointmentDetails}
              userAvatar={this.props.userInformation}
            />
          </section>
        </aside>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInformation: state.homePage.userInformation,
    appointmentsForToday: state.homePage.appointmentsForToday,
    upcomingAppointments: state.homePage.upcomingAppointments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFetchAppointmentForTodayData: () =>
      dispatch(actions.initFetchAppointmentsForTodayData()),
    onInitFetchUpcomingAppointmentData: (start, end) =>
      dispatch(actions.initFetchUpcomingAppointmentsData(start, end))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
