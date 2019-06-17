import React from "react";
import { Link } from "react-router-dom";
import "./NavigationItems.scss";

const navigationItems = props => {
  return (
    <ul className="navigationItems__list">
      <li className="navigationItems__list__item">
        <Link
          to="/"
          className="navigationItems__list__item--link active-link"
          title="Home"
        >
          <span className="fas fa-home" />
          <h6 className="navigationItems__list__item--link--title">Home</h6>
        </Link>
      </li>
      <li className="navigationItems__list__item">
        <div
          tabIndex="0"
          className="navigationItems__list__item--link"
          title="Messages"
        >
          <span className="fas fa-comment-alt" />
          <h6 className="navigationItems__list__item--link--title">Messages</h6>
        </div>
      </li>
      <li className="navigationItems__list__item">
        <div
          tabIndex="0"
          className="navigationItems__list__item--link"
          title="Notifications"
        >
          <span className="fas fa-bell" />
          <h6 className="navigationItems__list__item--link--title">
            Notifications
          </h6>
        </div>
      </li>
      <li className="navigationItems__list__item">
        <div
          tabIndex="0"
          className="navigationItems__list__item--link"
          title="History"
        >
          <span className="fas fa-history" />
          <h6 className="navigationItems__list__item--link--title">History</h6>
        </div>
      </li>
    </ul>
  );
};

export default navigationItems;
