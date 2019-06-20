export const transformTime = time => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? " AM" : " PM";
    time[0] = +time[0] % 12 || 12;
  }

  return time[0] + time[1] + time[2] + time[5];
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

export const destructureDateFormat = date => {
  let s = date.split(" ");
  return [s[0].replace(/\//g, "-"), s[1].replace(/:[0-9][0-9]\s*$/, "")];
};

export const formattedDateInput = () => {
  let date = new Date();
  let day = date.getDate();
  let year = date.getFullYear();
  let month = `${date.getMonth() < 10 ? "0" : ""}${date.getMonth() + 1}`;
  return year + "-" + month + "-" + day;
};

export const formattedEndAndStartData = date => {
  return (
    date.split("-")[0] + "/" + date.split("-")[1] + "/" + date.split("-")[2]
  );
};

export const verifyIfIsObject = data => {
  let dataVerified = null;
  if (typeof data === "object") {
    dataVerified = data;
  } else {
    dataVerified = JSON.parse(data);
  }
  return dataVerified;
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  return isValid;
};

export const validateDatesForm = (startdate, enddate, currentDate) => {
  if (new Date(startdate) > new Date(currentDate)) {
    if (new Date(enddate) > new Date(startdate)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
