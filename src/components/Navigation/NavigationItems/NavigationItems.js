import React from "react";

import "./NavigationItems.scss";

const navigationItems = props => {
  return (
    <ul className="navigationItems__list">
      <li className="navigationItems__list__item">
        <a
          href="/"
          className="navigationItems__list__item--link active-link"
          title="Home"
        >
          <span className="fas fa-home" />
          <h6 className="navigationItems__list__item--link--title">Home</h6>
        </a>
      </li>
      <li className="navigationItems__list__item">
        <a
          href="/"
          className="navigationItems__list__item--link"
          title="Messages"
        >
          <span className="fas fa-comment-alt" />
          <h6 className="navigationItems__list__item--link--title">Messages</h6>
        </a>
      </li>
      <li className="navigationItems__list__item">
        <a
          href="/"
          className="navigationItems__list__item--link"
          title="Notifications"
        >
          <span className="fas fa-bell" />
          <h6 className="navigationItems__list__item--link--title">
            Notifications
          </h6>
        </a>
      </li>
      <li className="navigationItems__list__item">
        <a
          href="/"
          className="navigationItems__list__item--link"
          title="History"
        >
          <span className="fas fa-history" />
          <h6 className="navigationItems__list__item--link--title">History</h6>
        </a>
      </li>
    </ul>
  );
};

export default navigationItems;
