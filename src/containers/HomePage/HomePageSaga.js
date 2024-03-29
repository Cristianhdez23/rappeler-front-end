import { put, takeEvery } from "redux-saga/effects";

import {
  setUserData,
  setAppointmentData,
  setUpcomingAppointmentData,
  setCreateAppointmentStatus,
  setUpdateSuccess
} from "./HomePageActions";

import {
  INIT_USER_DATA,
  INIT_FETCH_APPOINTMENT_DATA,
  INIT_FETCH_UPCOMING_APPOINTMENT_DATA,
  INIT_CREATE_APPOINTMENT,
  INIT_UPDATE_APPOINTMENT_DATA
} from "./HomePageConstants";

import firebase from "../../utils/FirebaseInstance";

import { calculateDateIn1Day } from "../../utils/Functions";

import { queryDayAfter, queryRealTime } from "../../utils/Variables";

const initUserDataSaga = function* initUserDataSaga(action) {
  try {
    const db = firebase.firestore();
    let userInformation = null;
    yield db
      .collection("user")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          userInformation = doc.data();
        });
      });
    yield put(setUserData(userInformation));
  } catch (error) {
    yield console.log("Error!");
  }
};

const initFetchAppointmentsForTodayDataSaga = function* initFetchAppointmentsForTodayDataSaga(
  action
) {
  try {
    const db = firebase.firestore();
    let appointmentsForToday = [];
    yield db
      .collection("appointments2")
      .where("startdate", ">=", queryRealTime)
      .where("startdate", "<", queryDayAfter)
      .orderBy("startdate", "asc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          appointmentsForToday.push(doc.data());
        });
      });

    yield put(setAppointmentData(appointmentsForToday));
  } catch (error) {
    yield console.log("Error!");
  }
};

const initFetchUpcomingAppointmentsDataSaga = function* initFetchUpcomingAppointmentsDataSaga(
  action
) {
  try {
    const db = firebase.firestore();
    let upcomingAppointments = [];
    let startPoint = action.start ? String(action.start) : queryDayAfter;
    let endPoint = action.end
      ? String(action.end)
      : calculateDateIn1Day(queryDayAfter);

    yield db
      .collection("appointments2")
      .where("startdate", ">=", startPoint)
      .where("startdate", "<", endPoint)
      .orderBy("startdate", "asc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          upcomingAppointments.push(doc.data());
        });
      });
    yield put(setUpcomingAppointmentData(upcomingAppointments, action.start));
  } catch (error) {
    yield console.log("Error!");
  }
};

const initCreateAppointmentSaga = function* initCreateAppointmentSaga(action) {
  try {
    const db = firebase.firestore();
    yield db.collection("appointments2").add(action.appointmentInformation);
    yield put(setCreateAppointmentStatus(action.appointmentInformation));
  } catch (error) {
    yield console.log("Error!");
  }
};

const initUpdateAppointmentDataSaga = function* initUpdateAppointmentDataSaga(
  action
) {
  try {
    const db = firebase.firestore();
    yield db
      .collection("appointments2")
      .where("startdate", "==", action.previousAppointmentData.startdate)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection("appointments2")
            .doc(doc.id)
            .update({
              status: action.newAppointmentData.status,
              enddate: action.newAppointmentData.enddate,
              startdate: action.newAppointmentData.startdate,
              location: action.newAppointmentData.location,
              topics: action.newAppointmentData.topics
            });
        });
      });
    yield put(setUpdateSuccess(true));
  } catch (error) {
    yield console.log("Error!");
  }
};

export function* HomePageSaga() {
  yield takeEvery(INIT_USER_DATA, initUserDataSaga);
  yield takeEvery(
    INIT_FETCH_APPOINTMENT_DATA,
    initFetchAppointmentsForTodayDataSaga
  );
  yield takeEvery(
    INIT_FETCH_UPCOMING_APPOINTMENT_DATA,
    initFetchUpcomingAppointmentsDataSaga
  );
  yield takeEvery(INIT_CREATE_APPOINTMENT, initCreateAppointmentSaga);
  yield takeEvery(INIT_UPDATE_APPOINTMENT_DATA, initUpdateAppointmentDataSaga);
}
