import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

// Components
import App from "./App";
// Reducers
import HomePageReducer from "./containers/HomePage/HomePageReducer";
import MonthsInformationReducer from "./containers/MonthsInformation/MonthsInformationReducer";
// Sagas
import { HomePageSaga } from "./containers/HomePage/HomePageSaga";
import { MonthsInformationSaga } from "./containers/MonthsInformation/MonthsInformationSaga";
// Style files
import "./index.css";

import * as serviceWorker from "./serviceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  homePage: HomePageReducer,
  monthsInformation: MonthsInformationReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(HomePageSaga);
sagaMiddleware.run(MonthsInformationSaga);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
