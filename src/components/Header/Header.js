import React from "react";

import Spinner from "../UI/Spinner/Spinner";

import "./Header.scss";
const header = props => {
  let userData = (
    <div className="header__user-block">
      <Spinner />
    </div>
  );

  if (props.userInformation) {
    userData = (
      <div className="header__user-block">
        <div className="header__user-block--image">
          <img src={props.userInformation.avatar} alt="User" />
        </div>
        <h6 className="header__user-block--name">
          {props.userInformation.name}
        </h6>
      </div>
    );
  }

  return (
    <header className="header">
      <h1 className="header--title">Rappeler</h1>
      {userData}
    </header>
  );
};

export default header;
