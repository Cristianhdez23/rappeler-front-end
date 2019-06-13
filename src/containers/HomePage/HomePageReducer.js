import * as actionTypes from "./HomePageConstants";

const initialState = {
  userInformation: null,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userInformation: action.userInformation,
        error: false
      };
    default:
      return state;
  }
};

export default reducer;
