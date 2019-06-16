import {
  INIT_FETCH_MONTH_INFORMATION,
  SET_MONTH_INFORMATION,
  SET_MONTH_AND_YEAR
} from "./MonthsInformationConstants";

export const initFetchMonthInformation = (startDate, endDate) => {
  return {
    type: INIT_FETCH_MONTH_INFORMATION,
    startDate: startDate,
    endDate: endDate
  };
};

export const setMonthInformation = (
  confirmedQuantity,
  pendingQuantity,
  cancelledQuantity
) => {
  return {
    type: SET_MONTH_INFORMATION,
    confirmedQuantity: confirmedQuantity,
    pendingQuantity: pendingQuantity,
    cancelledQuantity: cancelledQuantity
  };
};

export const setMonthAndYearForMonthInformation = (month, year) => {
  return {
    type: SET_MONTH_AND_YEAR,
    month: month,
    year: year
  };
}
