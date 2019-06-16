import { put, takeEvery } from "redux-saga/effects";

import { setMonthInformation } from "./MonthsInformationActions";

import { INIT_FETCH_MONTH_INFORMATION } from "./MonthsInformationConstants";

import firebase from "../../utils/FirebaseInstance";

const initFetchMonthInformationSaga = function* initFetchMonthInformationSaga(
  action
) {
  try {
    const db = firebase.firestore();
    let monthInformation = [];
    let startPoint = String(action.startDate);
    let endPoint = String(action.endDate);
    yield db
      .collection("appointments2")
      .where("startdate", ">=", startPoint)
      .where("startdate", "<=", endPoint)
      .orderBy("startdate", "asc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          monthInformation.push(doc.data());
        });
      });

    let confirmedAppointments = monthInformation.filter(
      x => x.status === "confirmed"
    );

    let pendingAppointments = monthInformation.filter(
      x => x.status === "pending"
    );

    let cancelledAppointments = monthInformation.filter(
      x => x.status === "cancelled"
    );

    yield put(
      setMonthInformation(
        confirmedAppointments.length,
        pendingAppointments.length,
        cancelledAppointments.length
      )
    );
  } catch (error) {
    yield console.log("Error!");
  }
};

export function* MonthsInformationSaga() {
  yield takeEvery(INIT_FETCH_MONTH_INFORMATION, initFetchMonthInformationSaga);
}
