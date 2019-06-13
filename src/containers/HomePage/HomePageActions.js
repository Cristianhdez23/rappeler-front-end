import { SET_USER_DATA, INIT_USER_DATA } from "./HomePageConstants";

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
