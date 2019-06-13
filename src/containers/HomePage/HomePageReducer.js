import * as actionTypes from "./HomePageConstants";

const initialState = {
  userInformation: null,
  error: false,
  appointmentsForToday: null,
  upcomingAppointments: []
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
      const newInformation = state.upcomingAppointments.concat(
        action.upcomingAppointments
      );
      return {
        ...state,
        upcomingAppointments: newInformation,
        error: false
      };
    default:
      return state;
  }
};

export default reducer;
