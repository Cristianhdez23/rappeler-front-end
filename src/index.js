import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App";
// Reducers
import HomePageReducer from "./containers/HomePage/HomePageReducer";
import MonthsInformationReducer from "./containers/MonthsInformation/MonthsInformationReducer";
import AppointmentSectionReducer from "./containers/AppointmentSection/AppointmentSectionReducer";
// Sagas
import { HomePageSaga } from "./containers/HomePage/HomePageSaga";
import { MonthsInformationSaga } from "./containers/MonthsInformation/MonthsInformationSaga";
import { AppointmentSectionSaga } from "./containers/AppointmentSection/AppointmentSectionSaga";
// Style files
import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  homePage: HomePageReducer,
  monthsInformation: MonthsInformationReducer,
  appointmentSection :AppointmentSectionReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(HomePageSaga);
sagaMiddleware.run(MonthsInformationSaga);
sagaMiddleware.run(AppointmentSectionSaga);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
