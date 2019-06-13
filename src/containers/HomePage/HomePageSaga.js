import { put, takeEvery } from "redux-saga/effects";

import { setUserData } from "./HomePageActions";

import { INIT_USER_DATA } from "./HomePageConstants";

import firebase from "../../utils/FirebaseInstance";

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
    // yield put(());
  }
};

export function* HomePageSaga() {
  yield takeEvery(INIT_USER_DATA, initUserDataSaga);
}
