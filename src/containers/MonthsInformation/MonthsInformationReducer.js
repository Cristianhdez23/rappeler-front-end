import * as actionTypes from "./MonthsInformationConstants";

const initialState = {
  month: null,
  year: null,
  confirmedQuantity: null,
  error: false,
  pendingQuantity: null,
  cancelledQuantity: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MONTH_INFORMATION:
      return {
        ...state,
        confirmedQuantity: action.confirmedQuantity,
        pendingQuantity: action.pendingQuantity,
        cancelledQuantity: action.cancelledQuantity,
        error: false
      };
    case actionTypes.SET_MONTH_AND_YEAR:
      return {
        ...state,
        month: action.month,
        year: action.year
      };
    default:
      return state;
  }
};

export default reducer;
