import React from "react";

import userImage from "../../assets/user.jpg";
import "./Header.scss";
const header = () => {
  return (
    <header className="header">
      <div className="header--title">Rappeler</div>
      <div className="header__user-block">
        <div className="header__user-block--image">
          <img src={userImage} alt="User" />
        </div>
        <h6 className="header__user-block--name">John Doe</h6>
      </div>
    </header>
  );
};

export default header;
