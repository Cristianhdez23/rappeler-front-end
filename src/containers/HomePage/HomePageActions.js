import {
  SET_USER_DATA,
  INIT_USER_DATA,
  INIT_FETCH_APPOINTMENT_DATA,
  SET_APPOINTMENT_DATA,
  INIT_FETCH_UPCOMING_APPOINTMENT_DATA,
  SET_UPCOMING_APPOINTMENT_DATA,
  INIT_CREATE_APPOINTMENT,
  SET_CREATE_APPOINTMENT_STATUS,
  SET_FALSE_STATE_CREATE_APPOINTMENT_STATUS,
  INIT_UPDATE_APPOINTMENT_DATA,
  SET_UPDATE_SUCCESS
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

export const setUpcomingAppointmentData = (
  upcomingAppointments,
  stateUpcomingArray
) => {
  return {
    type: SET_UPCOMING_APPOINTMENT_DATA,
    upcomingAppointments: upcomingAppointments,
    stateUpcomingArray: stateUpcomingArray
  };
};

export const initCreateAppointment = appointmentInformation => {
  return {
    type: INIT_CREATE_APPOINTMENT,
    appointmentInformation: appointmentInformation
  };
};

export const setCreateAppointmentStatus = appointmentInformation => {
  return {
    type: SET_CREATE_APPOINTMENT_STATUS,
    appointmentInformation: appointmentInformation
  };
};

export const setFalseStateCreateAppointmentStatus = () => {
  return {
    type: SET_FALSE_STATE_CREATE_APPOINTMENT_STATUS
  };
};

export const initUpdateAppointmentData = (
  newAppointmentData,
  previousAppointmentData
) => {
  return {
    type: INIT_UPDATE_APPOINTMENT_DATA,
    newAppointmentData: newAppointmentData,
    previousAppointmentData: previousAppointmentData
  };
};

export const setUpdateSuccess = stateUpdateSuccess => {
  return {
    type: SET_UPDATE_SUCCESS,
    stateUpdateSuccess: stateUpdateSuccess
  };
};
