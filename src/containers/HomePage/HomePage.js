import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import AppointmentSection from "../AppointmentSection/AppointmentSection";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import MonthsInformation from "../MonthsInformation/MonthsInformation";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";
import CreateAppointmentForm from "../../components/CreateAppointmentForm/CreateAppointmentForm";
import EditAppointment from "../../components/EditAppointment/EditAppointment";
//Actions
import * as actions from "./HomePageActions";
//Util Function
import {
  calculateDateIn2Days,
  calculateDateIn1Day,
  formattedEndAndStartData,
  verifyIfIsObject,
  updateObject,
  checkValidity,
  validateDatesForm
} from "../../utils/Functions";
//Util Variables
import {
  initialCreateAppointmentStateForm,
  initalEditAppointmentsStateForm,
  queryDayAfter,
  queryRealTime
} from "../../utils/Variables";
//Style
import "./HomePage.scss";

class HomePage extends Component {
  state = {
    showSideDrawer: false,
    openAppointmentDetails: false,
    instanceForAppointmentDetails: null,
    editableContentAppointmentDetails: false,
    startNumberOfUpcomingData: null,
    endNumberOfUpcomingData: null,
    canLoadMoreData: true,
    openCreateAppointment: false,
    createAppointmentForm: null,
    formIsValid: true,
    loading: false,
    editAppointmentForm: null,
    formEditIsValid: true
  };

  componentWillMount() {
    this.setState({
      createAppointmentForm: initialCreateAppointmentStateForm,
      editAppointmentForm: initalEditAppointmentsStateForm
    });
  }

  componentDidMount() {
    this.props.onInitFetchAppointmentForTodayData();
    this.props.onInitFetchUpcomingAppointmentData(
      this.state.startNumberOfUpcomingData,
      this.state.endNumberOfUpcomingData
    );
    this.setState({
      startNumberOfUpcomingData: calculateDateIn1Day(queryDayAfter),
      endNumberOfUpcomingData: calculateDateIn2Days(queryDayAfter)
    });
  }

  componentDidUpdate() {
    if (this.props.createAppointmentSucess) {
      this.props.onInitFetchAppointmentForTodayData();
      this.props.onInitFetchUpcomingAppointmentData(null, null);
      this.props.onInitFalseStateCreateAppointmentStatus();
      this.setState({
        startNumberOfUpcomingData: calculateDateIn1Day(queryDayAfter),
        endNumberOfUpcomingData: calculateDateIn2Days(queryDayAfter),
        createAppointmentForm: initialCreateAppointmentStateForm,
        instanceForAppointmentDetails: this.props.createAppointmentSucess,
        openAppointmentDetails: true,
        openCreateAppointment: false
      });
    }

    if (this.props.updateSuccess) {
      this.props.onInitFetchAppointmentForTodayData();
      this.props.onInitFetchUpcomingAppointmentData(null, null);
      this.props.onInitSetUpdateSuccess(false);
      this.setState({
        startNumberOfUpcomingData: calculateDateIn1Day(queryDayAfter),
        endNumberOfUpcomingData: calculateDateIn2Days(queryDayAfter),
        instanceForAppointmentDetails: false,
        openAppointmentDetails: false,
        openCreateAppointment: false
      });
    }

    if (this.props.requestSuccessful) {
      this.setState({
        instanceForAppointmentDetails: false,
        openAppointmentDetails: false,
        openCreateAppointment: false
      });
    }
  }

  resetUpcomingDataDate = () => {
    this.setState({
      startNumberOfUpcomingData: calculateDateIn1Day(queryDayAfter),
      endNumberOfUpcomingData: calculateDateIn2Days(queryDayAfter)
    });
  };

  createAppointmentHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.createAppointmentForm) {
      formData[formElementIdentifier] = this.state.createAppointmentForm[
        formElementIdentifier
      ].value;
    }
    let enddate = formattedEndAndStartData(formData.endDate);
    let startdate = formattedEndAndStartData(formData.startDate);
    let topics = [];
    formData.topics.split(",").map(x => topics.push({ topic: x }));
    let userInfo = verifyIfIsObject(formData.friendList);
    let location = verifyIfIsObject(formData.location);

    const appointmentInformation = {
      avatar: userInfo.avatar,
      email: userInfo.email,
      enddate: enddate + " " + formData.endTime + ":00",
      first_name: userInfo.first_name,
      gender: "Male",
      last_name: userInfo.last_name,
      location: [location],
      phone: userInfo.phone,
      startdate: startdate + " " + formData.startTime + ":00",
      status: "pending",
      topics: topics
    };
    
    let formIsValidToUpdate = validateDatesForm(appointmentInformation.startdate,
      appointmentInformation.enddate,queryRealTime);
    if (formIsValidToUpdate) {
        this.setState({ formIsValid: true });
        this.props.onInitCreateAppointment(appointmentInformation);
    } else {
      this.setState({ formIsValid: false });
    }
  };

  editAppointmentHandler = (event, previousAppointmentData) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.editAppointmentForm) {
      formData[formElementIdentifier] = this.state.editAppointmentForm[
        formElementIdentifier
      ].value;
    }
    let enddate = formattedEndAndStartData(formData.endDate);
    let startdate = formattedEndAndStartData(formData.startDate);
    let topics = [];
    formData.topics.split(",").map(x => topics.push({ topic: x }));
    let location = verifyIfIsObject(formData.location);

    const appointmentInformation = {
      enddate: enddate + " " + formData.endTime + ":00",
      location: [location],
      startdate: startdate + " " + formData.startTime + ":00",
      status: "pending",
      topics: topics
    };

    let formIsValidToUpdate = validateDatesForm(appointmentInformation.startdate,
      appointmentInformation.enddate,queryRealTime);
    if (formIsValidToUpdate) {
      this.setState({ formEditIsValid: true });
      this.props.onInitUpdateAppointmentData(appointmentInformation,
        previousAppointmentData);
    } else {
      this.setState({ formEditIsValid: false });
    }
  };

  inputCreateAppointmentChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.createAppointmentForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.createAppointmentForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedOrderForm = updateObject(this.state.createAppointmentForm, {
      [inputIdentifier]: updatedFormElement
    });
    this.setState({
      createAppointmentForm: updatedOrderForm
    });
  };

  inputEditAppointmentChangedHandler = (
    event,
    inputIdentifier,
    posibleValue
  ) => {
    let value = null;
    if (posibleValue) {
      value = posibleValue;
    } else {
      value = event.target.value;
    }
    const updatedFormElement = updateObject(
      this.state.editAppointmentForm[inputIdentifier],
      {
        value: value,
        valid: checkValidity(
          value,
          this.state.editAppointmentForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedOrderForm = updateObject(this.state.editAppointmentForm, {
      [inputIdentifier]: updatedFormElement
    });
    this.setState({
      editAppointmentForm: updatedOrderForm
    });
  };

  loadMoreAppointmentsHandler = event => {
    event.target.blur();
    this.props.onInitFetchUpcomingAppointmentData(
      this.state.startNumberOfUpcomingData,
      this.state.endNumberOfUpcomingData
    );

    this.setState({
      startNumberOfUpcomingData: this.state.endNumberOfUpcomingData,
      endNumberOfUpcomingData: calculateDateIn2Days(
        this.state.endNumberOfUpcomingData
      )
    });
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  onClickOpenCardHandler = instanceAppointment => {
    this.setState({
      instanceForAppointmentDetails: instanceAppointment,
      openAppointmentDetails: true,
      openCreateAppointment: false,
      editableContentAppointmentDetails: false,
      formEditIsValid: true
    });
  };

  onClickCloseCardHandler = () => {
    this.setState({
      instanceForAppointmentDetails: null,
      openAppointmentDetails: false,
      openCreateAppointment: false
    });
  };

  onClickOpenEditCardHandler = (e, instanceAppointment) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      instanceForAppointmentDetails: instanceAppointment,
      openAppointmentDetails: true,
      openCreateAppointment: false,
      editableContentAppointmentDetails: true,
      formEditIsValid: true
    });
  };

  onClickOpenCreateAppointmentHandler = e => {
    e.preventDefault();
    this.setState({
      openAppointmentDetails: false,
      openCreateAppointment: true
    });
  };

  render() {
    let contentSideDrawerAndDetails = null,
      openModalOrDetails = null;
    if (this.state.openCreateAppointment) {
      contentSideDrawerAndDetails = (
        <CreateAppointmentForm
          createAppointmentForm={this.state.createAppointmentForm}
          createAppointmentHandler={this.createAppointmentHandler}
          inputChangedHandler={this.inputCreateAppointmentChangedHandler}
          formIsValid={this.state.formIsValid}
        />
      );
    } else if (this.state.openAppointmentDetails) {
      contentSideDrawerAndDetails = (
        <EditAppointment
          editAppointmentForm={this.state.editAppointmentForm}
          editableContentAppointmentDetails={
            this.state.editableContentAppointmentDetails
          }
          instanceForAppointmentDetails={
            this.state.instanceForAppointmentDetails
          }
          inputChangedHandler={this.inputEditAppointmentChangedHandler}
          userAvatar={this.props.userInformation}
          editAppointmentHandler={this.editAppointmentHandler}
          formIsValid={this.state.formEditIsValid}
        />
      );
    }

    openModalOrDetails = this.state.openAppointmentDetails
      ? this.state.openAppointmentDetails
      : this.state.openCreateAppointment;

    return (
      <main className="homePage">
        <SideDrawer
          open={openModalOrDetails}
          closed={this.onClickCloseCardHandler}
        >
          {contentSideDrawerAndDetails}
        </SideDrawer>
        <section className="detail-container">
          <AppointmentSection
            appointmentsForToday={this.props.appointmentsForToday}
            upcomingAppointments={this.props.upcomingAppointments}
            onClickOpenCardHandler={this.onClickOpenCardHandler}
            onClickOpenEditCardHandler={this.onClickOpenEditCardHandler}
            onClickOpenCreateAppointmentHandler={
              this.onClickOpenCreateAppointmentHandler
            }
            loadMoreAppointmentsHandler={this.loadMoreAppointmentsHandler}
            resetUpcomingData={this.resetUpcomingDataDate}
          />
        </section>

        <aside className="aside-container">
          <section className="aside-container__month-information">
            <MonthsInformation />
          </section>
          <section className="aside-container__appointment-detail">
            <AppointmentDetails
              open={openModalOrDetails}
              onClickCloseDetails={this.onClickCloseCardHandler}
              instanceForAppointmentDetails={
                this.state.instanceForAppointmentDetails
              }
            >
              {contentSideDrawerAndDetails}
            </AppointmentDetails>
          </section>
        </aside>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInformation: state.homePage.userInformation,
    appointmentsForToday: state.homePage.appointmentsForToday,
    upcomingAppointments: state.homePage.upcomingAppointments,
    createAppointmentSucess: state.homePage.createAppointmentSucess,
    updateSuccess: state.homePage.updateSuccess,
    requestSuccessful: state.appointmentSection.requestSuccessful
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFetchAppointmentForTodayData: () =>
      dispatch(actions.initFetchAppointmentsForTodayData()),
    onInitFetchUpcomingAppointmentData: (start, end) =>
      dispatch(actions.initFetchUpcomingAppointmentsData(start, end)),
    onInitCreateAppointment: appointmentData =>
      dispatch(actions.initCreateAppointment(appointmentData)),
    onInitFalseStateCreateAppointmentStatus: () =>
      dispatch(actions.setFalseStateCreateAppointmentStatus()),
    onInitUpdateAppointmentData: (
      newAppointmentData,
      previousAppointmentData
    ) =>
      dispatch(
        actions.initUpdateAppointmentData(
          newAppointmentData,
          previousAppointmentData
        )
      ),
    onInitSetUpdateSuccess: stateUpdateSuccess => {
      dispatch(actions.setUpdateSuccess(stateUpdateSuccess));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
