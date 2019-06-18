import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Header from "../../components/Header/Header";
//Actions
import * as actions from "../HomePage/HomePageActions";
//Style Files
import "./Layout.scss";

class Layout extends Component {
  componentDidMount() {
    this.props.onInitFetchUserData();
  }

  render() {
    return (
      <>
        <Toolbar />
        <Header userInformation={this.props.userInformation} />
        <main className="main-content">{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInformation: state.homePage.userInformation,
    error: state.homePage.userInformation
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
