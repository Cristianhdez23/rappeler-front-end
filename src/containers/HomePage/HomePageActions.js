import {
  SET_USER_DATA,
  INIT_USER_DATA,
  INIT_FETCH_APPOINTMENT_DATA,
  SET_APPOINTMENT_DATA,
  INIT_FETCH_UPCOMING_APPOINTMENT_DATA,
  SET_UPCOMING_APPOINTMENT_DATA
} from "./HomePageConstants";

export const initUserData = () => {
  return {
    type: INIT_USER_DATA
  };
};

export const setUserData = userInformation => {
  return {
    type: SET_USER_DATA,
    userInformation: userInformation
  };
};

export const initFetchAppointmentsForTodayData = () => {
  return {
    type: INIT_FETCH_APPOINTMENT_DATA
  };
};

export const setAppointmentData = appointmentsForToday => {
  return {
    type: SET_APPOINTMENT_DATA,
    appointmentsForToday: appointmentsForToday
  };
};

export const initFetchUpcomingAppointmentsData = (start, end) => {
  return {
    type: INIT_FETCH_UPCOMING_APPOINTMENT_DATA,
    start: start,
    end: end
  };
};

export const setUpcomingAppointmentData = upcomingAppointments => {
  return {
    type: SET_UPCOMING_APPOINTMENT_DATA,
    upcomingAppointments: upcomingAppointments
  };
};
