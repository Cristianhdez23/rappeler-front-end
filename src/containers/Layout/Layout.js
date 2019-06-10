import React, { Component } from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import "./Layout.scss";

class Layout extends Component {
  state = {};
  render() {
    return (
      <>
        <Toolbar />
        <main className="main-content">{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
