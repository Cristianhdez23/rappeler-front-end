import React, { Component } from "react";

import FilterBar from "../../components/FilterBar/FilterBar";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
// import SideDrawer from "../../components/MonthsInformation/SideDrawer/SideDrawer";

import "./HomePage.scss";
import MonthsInformation from "../../components/MonthsInformation/MonthsInformation";

class HomePage extends Component {
  state = {
    allButtonClicked: true,
    confirmedButtonClicked: false,
    pendingButtonClicked: false,
    cancelledButtonClicked: false,

    showSideDrawer: false
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

  render() {
    return (
      <main className="homePage">
        {/* <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        /> */}
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
              <AppointmentCard status="confirmed" />
              <AppointmentCard status="pending" />
              <AppointmentCard status="cancelled" />
            </section>
            <section className="detail-container__appointments__upcoming-block">
              <h2 className="detail-container__appointments__upcoming-block--today-title">
                Upcoming
              </h2>
              <AppointmentCard status="confirmed" />
              <AppointmentCard status="pending" />
              <AppointmentCard status="cancelled" />
              <AppointmentCard status="confirmed" />
              <AppointmentCard status="pending" />
              <AppointmentCard status="cancelled" />
            </section>
          </section>
          {/* <div className="mobile-menu">
            <button
              className="mobile-menu--btn"
              title="Months Information"
              aria-label="Months Information"
              onClick={this.sideDrawerOpenHandler}
            >
              <span className="fas fa-bars" alt="as" />
            </button>
          </div> */}
        </section>

        <aside className="aside-container">
          <section className="aside-container__month-information">
            <MonthsInformation />
          </section>
        </aside>
      </main>
    );
  }
}

export default HomePage;
