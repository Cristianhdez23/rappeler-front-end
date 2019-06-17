import {
  INIT_CHANGE_APPOINTMENT_STATUS,
  SET_REQUEST_SUCCESSFUL,
  SET_FALSE_STATE_REQUEST_SUCCESSFUL
} from "./AppointmentSectionConstants";

export const initChangeAppointmentStatus = (appointmentData, newStatus) => {
  return {
    type: INIT_CHANGE_APPOINTMENT_STATUS,
    appointmentData: appointmentData,
    newStatus: newStatus
  };
};

export const setRequestSuccessful = () => {
  return {
    type: SET_REQUEST_SUCCESSFUL
  };
};

export const setFalseStateRequestSuccessful = () => {
  return {
    type: SET_FALSE_STATE_REQUEST_SUCCESSFUL
  };
};
