import { put, takeEvery } from "redux-saga/effects";

import { setRequestSuccessful } from "./AppointmentSectionActions";

import { INIT_CHANGE_APPOINTMENT_STATUS } from "./AppointmentSectionConstants";

import firebase from "../../utils/FirebaseInstance";

const initChangeAppointmentStatusSaga = function* initChangeAppointmentStatusSaga(
  action
) {
  try {
    const db = firebase.firestore();
    yield db
      .collection("appointments2")
      .where("startdate", "==", action.appointmentData.startdate)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection("appointments2")
            .doc(doc.id)
            .update({ status: action.newStatus });
        });
      });
    yield put(setRequestSuccessful());
  } catch (error) {
    yield console.log("Error!");
  }
};
export function* AppointmentSectionSaga() {
  yield takeEvery(
    INIT_CHANGE_APPOINTMENT_STATUS,
    initChangeAppointmentStatusSaga
  );
}
