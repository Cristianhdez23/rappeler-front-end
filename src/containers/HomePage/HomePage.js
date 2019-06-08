import React, { Component } from "react";

import FilterBar from "../../components/FilterBar/FilterBar";

class HomePage extends Component {
  state = {
    allButtonClicked: true,
    confirmedButtonClicked: false,
    pendingButtonClicked: false,
    cancelledButtonClicked: false
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
      <>
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
      </>
    );
  }
}

export default HomePage;
