export const transformTime = time => {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
        time
    ];

    if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? " AM" : " PM";
        time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
};

export const findMonth = dateAppointment => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return `${months[dateAppointment.getMonth()]} ${dateAppointment.getDate()}`;
};

export const getDurationAppointment = (startdate, enddate) => {
    const differenceBetweenDates = Math.abs(
        new Date(startdate) - new Date(enddate)
    );
    const minutes = Math.floor(differenceBetweenDates / 60000);
    return `${minutes} minutes`;
};

// DATE CREATION
const realTimeDateAndTime = new Date();
let month = `${
    realTimeDateAndTime.getMonth() < 10 ? "0" : ""
    }${realTimeDateAndTime.getMonth() + 1}`;
let hour = `${
    realTimeDateAndTime.getHours() < 10 ? "0" : ""
    }${realTimeDateAndTime.getHours()}`;
let minutes = `${
    realTimeDateAndTime.getMinutes() < 10 ? "0" : ""
    }${realTimeDateAndTime.getMinutes()}`;
let seconds = `${
    realTimeDateAndTime.getSeconds() < 10 ? "0" : ""
    }${realTimeDateAndTime.getSeconds()}`;
export const queryRealTime =
    realTimeDateAndTime.getFullYear() +
    "/" +
    month +
    "/" +
    realTimeDateAndTime.getDate() +
    " " +
    hour +
    ":" +
    minutes +
    ":" +
    seconds;

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
month = `${tomorrow.getMonth() < 10 ? "0" : ""}${tomorrow.getMonth() + 1}`;
export const queryDayAfter = `${tomorrow.getFullYear()}/${month}/${tomorrow.getDate()}`;

export const calculateDateIn2Days = date => {
    let dateIn2dAYS = new Date(date);
    dateIn2dAYS.setDate(dateIn2dAYS.getDate() + 5);
    let month = `${
        dateIn2dAYS.getMonth() < 10 ? "0" : ""
        }${dateIn2dAYS.getMonth() + 1}`;
    month = `${dateIn2dAYS.getMonth() < 10 ? "0" : ""}${dateIn2dAYS.getMonth() +
        1}`;
    const queryDateIn2Days = `${dateIn2dAYS.getFullYear()}/${month}/${dateIn2dAYS.getDate()}`;
    return queryDateIn2Days;
};

export const calculateDateIn1Day = date => {
    let dateIn2dAYS = new Date(date);
    dateIn2dAYS.setDate(dateIn2dAYS.getDate() + 1);
    let month = `${
        dateIn2dAYS.getMonth() < 10 ? "0" : ""
        }${dateIn2dAYS.getMonth() + 1}`;
    month = `${dateIn2dAYS.getMonth() < 10 ? "0" : ""}${dateIn2dAYS.getMonth() +
        1}`;
    const queryDateIn1Days = `${dateIn2dAYS.getFullYear()}/${month}/${dateIn2dAYS.getDate()}`;
    return queryDateIn1Days;
};

export const minutesLeft = date => {
    let minDiff = null;
    let realTimeHour = new Date();
    let dateDiff = new Date(date) - realTimeHour;
    minDiff = Math.round(dateDiff / 60000);
    return minDiff;
};

export const filterAppointments = (
    appointmentsData,
    allButtonClicked,
    confirmedButtonClicked,
    pendingButtonClicked,
    cancelledButtonClicked
) => {
    let filteredAppointments = appointmentsData;
    if (
        allButtonClicked ||
        (confirmedButtonClicked && pendingButtonClicked && cancelledButtonClicked)
    ) {
        filteredAppointments = appointmentsData;
    } else if (confirmedButtonClicked && pendingButtonClicked) {
        filteredAppointments = filteredAppointments.filter(
            x => x.status === "confirmed" || x.status === "pending"
        );
    } else if (confirmedButtonClicked && cancelledButtonClicked) {
        filteredAppointments = filteredAppointments.filter(
            x => x.status === "confirmed" || x.status === "cancelled"
        );
    } else if (pendingButtonClicked && cancelledButtonClicked) {
        filteredAppointments = filteredAppointments.filter(
            x => x.status === "pending" || x.status === "cancelled"
        );
    } else if (confirmedButtonClicked) {
        filteredAppointments = filteredAppointments.filter(
            x => x.status === "confirmed"
        );
    } else if (pendingButtonClicked) {
        filteredAppointments = filteredAppointments.filter(
            x => x.status === "pending"
        );
    } else if (cancelledButtonClicked) {
        filteredAppointments = filteredAppointments.filter(
            x => x.status === "cancelled"
        );
    }
    return filteredAppointments;
};


export const initialStateForm =  {
    friendList: {
        elementType: "select",
        elementConfig: {
            options: [
                {
                    value: {
                        last_name: "Kincade",
                        first_name: "Paxon",
                        phone: "943-237-8503",
                        email: "pkincadedo@aboutads.info",
                        avatar:
                            "https://robohash.org/facilisoccaecatimolestias.jpg?size=50x50&set=set1"
                    },
                    displayValue: "Paxon Kincade"
                },
                {
                    value: {
                        last_name: "Rubinowitsch",
                        first_name: "Tammi",
                        phone: "745-547-0519",
                        email: "trubinowitsch3x@wisc.edu",
                        avatar:
                            "https://robohash.org/ullamexercitationemsequi.jpg?size=50x50&set=set1"
                    },
                    displayValue: "Tammi Rubinowitsch"
                }
            ]
        },
        value: {
            last_name: "Kincade",
            first_name: "Paxon",
            phone: "943-237-8503",
            email: "pkincadedo@aboutads.info",
            avatar:
                "https://robohash.org/facilisoccaecatimolestias.jpg?size=50x50&set=set1"
        },
        validation: { },
        label: "Invite a Person",
        valid: true
    },
    startDate: {
        elementType: "date",
        elementConfig: {
            type: "date",
            placeholder: "Start Date"
        },
        value: "",
        validation: {
            required: true
        },
        label: "Start Date",
        valid: false,
        touched: false
    },
    startTime: {
        elementType: "time",
        elementConfig: {
            type: "time",
            placeholder: "Start Time"
        },
        value: "",
        validation: {
            required: true
        },
        label: "Start Time",
        valid: false,
        touched: false
    },
    endDate: {
        elementType: "date",
        elementConfig: {
            type: "date",
            placeholder: "End Date"
        },
        value: "",
        validation: {
            required: true
        },
        label: "End Date",
        valid: false,
        touched: false
    },
    endTime: {
        elementType: "time",
        elementConfig: {
            type: "time",
            placeholder: "End Time"
        },
        value: "",
        validation: {
            required: true
        },
        label: "End Time",
        valid: false,
        touched: false
    },
    location: {
        elementType: "select",
        elementConfig: {
            options: [
                {
                    value: {
                        place: "Valley Edge",
                        street: "2 Garrison Road"
                    },
                    displayValue: "Valley Edge"
                },
                {
                    value: {
                        place: "Bartillon",
                        street: "72 Donald Junction"
                    },
                    displayValue: "Bartillon"
                },
                {
                    value: {
                        place: "Homewood",
                        street: "04863 Monica Circle"
                    },
                    displayValue: "Homewood"
                }
            ]
        },
        value: {
            place: "Valley Edge",
            street: "2 Garrison Road"
        },
        validation: { },
        label: "Location",
        valid: true
    },
    topics: {
        elementType: "textarea",
        elementConfig: {
            type: "text",
            placeholder: "Topics"
        },
        value: "",
        validation: {
            required: true
        },
        label: "Topics",
        valid: false,
        touched: false
    }
}
