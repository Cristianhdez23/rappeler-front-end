import * as actionTypes from "./AppointmentSectionConstants";

const initialState = {
  requestSuccessful: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REQUEST_SUCCESSFUL:
      return {
        ...state,
        requestSuccessful: true
      };
    case actionTypes.SET_FALSE_STATE_REQUEST_SUCCESSFUL:
      return {
        ...state,
        requestSuccessful: false
      };
    default:
      return state;
  }
};

export default reducer;
