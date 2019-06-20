import React from 'react';

const notificationItem = (props) => {
    let colorIcon = null,
        titleNotification = null;
    if (props.status === 'create') {
        colorIcon = "create-class"
        titleNotification = (
            <h5 className={["notification-box__list--item__information-block--data", colorIcon].join(" ")}>
                An <strong>appointment</strong> was created
            </h5>
        )
    } else if (props.status === 'statusChange') {
        colorIcon = "statusChange-class"
        titleNotification = (
            <h5 className={["notification-box__list--item__information-block--data", colorIcon].join(" ")}>
                <strong>Appointment</strong> status changed
            </h5>
        )
    } else if (props.status === 'update') {
        colorIcon = "update-class"
        titleNotification = (
            <h5 className={["notification-box__list--item__information-block--data", colorIcon].join(" ")}>
                An <strong>appointment</strong> was updated
            </h5>
        )
    };

    return (
        <li className="notification-box__list--item">
            <div className="notification-box__list--item__icon-block">
                <span className={["fas fa-calendar-check notification-box__list--item__icon-block--icon", colorIcon].join(" ")} />
            </div>
            <div className="notification-box__list--item__information-block">
                {titleNotification}
            </div>
        </li>
    );
}

export default notificationItem;