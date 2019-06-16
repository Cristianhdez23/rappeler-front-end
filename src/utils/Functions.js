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
export const queryRealTime =
  realTimeDateAndTime.getFullYear() +
  "/" +
  month +
  "/" +
  realTimeDateAndTime.getDate() +
  " " +
  hour +
  ":" +
  realTimeDateAndTime.getMinutes() +
  ":" +
  realTimeDateAndTime.getSeconds();

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
