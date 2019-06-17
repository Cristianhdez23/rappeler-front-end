import * as actionTypes from "./HomePageConstants";

const initialState = {
  userInformation: null,
  error: false,
  appointmentsForToday: null,
  upcomingAppointments: [],
  createAppointmentSucess: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userInformation: action.userInformation,
        error: false
      };
    case actionTypes.SET_APPOINTMENT_DATA:
      return {
        ...state,
        appointmentsForToday: action.appointmentsForToday,
        error: false
      };
    case actionTypes.SET_UPCOMING_APPOINTMENT_DATA:
      let newInformation = null;
      if (action.stateUpcomingArray === null) {
        newInformation = action.upcomingAppointments;
      } else {
        newInformation = state.upcomingAppointments.concat(
          action.upcomingAppointments
        );
      }

      return {
        ...state,
        upcomingAppointments: newInformation,
        error: false
      };
    case actionTypes.SET_CREATE_APPOINTMENT_STATUS:
      return {
        ...state,
        createAppointmentSucess: true
      };
    case actionTypes.SET_FALSE_STATE_CREATE_APPOINTMENT_STATUS:
      return {
        ...state,
        createAppointmentSucess: false
      };
    default:
      return state;
  }
};

export default reducer;
