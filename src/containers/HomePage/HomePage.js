import React, { Component } from "react";
import { connect } from "react-redux";

import FilterBar from "../../components/FilterBar/FilterBar";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";

import "./HomePage.scss";
import MonthsInformation from "../../components/MonthsInformation/MonthsInformation";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";

import * as actions from "./HomePageActions";

class HomePage extends Component {
  state = {
    allButtonClicked: true,
    confirmedButtonClicked: false,
    pendingButtonClicked: false,
    cancelledButtonClicked: false,

    showSideDrawer: false,

    openAppointmentDetails: false,
    instanceForAppointmentDetails: null,
    editableContentAppointmentDetails: false
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
  }

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
    this.setState({ instanceForAppointmentDetails: instanceAppointment });
    this.setState({ openAppointmentDetails: true });
    this.setState({ editableContentAppointmentDetails: false });
  };

  onClickCloseCardHandler = instanceAppointment => {
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
          />
        </SideDrawer>
        <section className="detail-container">
          <section className="month-information-mobile">
            <MonthsInformation />
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
              <div className="detail-container__appointments__today-block__information">
                <h2 className="detail-container__appointments__today-block__information--today-title">
                  Today
                </h2>
                <h5 className="detail-container__appointments__today-block__information--meeting-time">
                  Meeting in 19 minutes
                </h5>
              </div>
              <AppointmentCard
                onClickCard={this.onClickOpenCardHandler}
                status="confirmed"
                onClickEditCard={this.onClickOpenEditCardHandler}
              />
            </section>
            <section className="detail-container__appointments__upcoming-block">
              <h2 className="detail-container__appointments__upcoming-block--today-title">
                Upcoming
              </h2>
              <AppointmentCard
                onClickCard={this.onClickOpenCardHandler}
                status="pending"
                onClickEditCard={this.onClickOpenEditCardHandler}
              />
              <AppointmentCard
                onClickCard={this.onClickOpenCardHandler}
                status="cancelled"
                onClickEditCard={this.onClickOpenEditCardHandler}
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
            />
          </section>
        </aside>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
