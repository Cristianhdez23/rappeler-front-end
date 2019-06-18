import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import AppointmentSection from "../AppointmentSection/AppointmentSection";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import MonthsInformation from "../MonthsInformation/MonthsInformation";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";
import CreateAppointmentForm from "../../components/CreateAppointmentForm/CreateAppointmentForm";
//Actions
import * as actions from "./HomePageActions";
//Style
import "./HomePage.scss";
//Util
import {
  queryDayAfter,
  calculateDateIn2Days,
  calculateDateIn1Day,
  initialStateForm
} from "../../utils/Functions";
//import EditAppointment from "../../components/EditAppointment/EditAppointment";

import * as actions from "./HomePageActions";
import UpcomingAppointmentsSection from "../../components/UpcomingAppointmentsSection/UpcomingAppointmentsSection";

import {
  queryDayAfter,
  calculateDateIn2Days,
  calculateDateIn1Day
} from "../../utils/Functions";

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

    orderForm: {
      friendList: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: {
                last_name: "Kincade",
                first_name: "Paxon",
                phone: "943-237-8503",
                email: "pkincadedo@aboutads.info",
                avatar:
                  "https://robohash.org/facilisoccaecatimolestias.jpg?size=50x50&set=set1"
              },
              displayValue: "Paxon Kincade"
            },
            {
              value: {
                last_name: "Rubinowitsch",
                first_name: "Tammi",
                phone: "745-547-0519",
                email: "trubinowitsch3x@wisc.edu",
                avatar:
                  "https://robohash.org/ullamexercitationemsequi.jpg?size=50x50&set=set1"
              },
              displayValue: "Tammi Rubinowitsch"
            }
          ]
        },
        value: {
          last_name: "Kincade",
          first_name: "Paxon",
          phone: "943-237-8503",
          email: "pkincadedo@aboutads.info",
          avatar:
            "https://robohash.org/facilisoccaecatimolestias.jpg?size=50x50&set=set1"
        },
        validation: {},
        label: "Invite a Person",
        valid: true
      },
      startDate: {
        elementType: "date",
        elementConfig: {
          type: "date",
          placeholder: "Start Date"
        },
        value: "",
        validation: {
          required: true
        },
        label: "Start Date",
        valid: false,
        touched: false
      },
      startTime: {
        elementType: "time",
        elementConfig: {
          type: "time",
          placeholder: "Start Time"
        },
        value: "",
        validation: {
          required: true
        },
        label: "Start Time",
        valid: false,
        touched: false
      },
      endDate: {
        elementType: "date",
        elementConfig: {
          type: "date",
          placeholder: "End Date"
        },
        value: "",
        validation: {
          required: true
        },
        label: "End Date",
        valid: false,
        touched: false
      },
      endTime: {
        elementType: "time",
        elementConfig: {
          type: "time",
          placeholder: "End Time"
        },
        value: "",
        validation: {
          required: true
        },
        label: "End Time",
        valid: false,
        touched: false
      },
      location: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: {
                place: "Valley Edge",
                street: "2 Garrison Road"
              },
              displayValue: "Valley Edge"
            },
            {
              value: {
                place: "Bartillon",
                street: "72 Donald Junction"
              },
              displayValue: "Bartillon"
            },
            {
              value: {
                place: "Homewood",
                street: "04863 Monica Circle"
              },
              displayValue: "Homewood"
            }
          ]
        },
        value: {
          place: "Valley Edge",
          street: "2 Garrison Road"
        },
        validation: {},
        label: "Location",
        valid: true
      },
      topics: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Topics"
        },
        value: "",
        validation: {
          required: true
        },
        label: "Topics",
        valid: false,
        touched: false
      }
    },

    formIsValid: false,
    loading: false
  };

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
      this.setState({
        startNumberOfUpcomingData: calculateDateIn1Day(queryDayAfter),
        endNumberOfUpcomingData: calculateDateIn2Days(queryDayAfter)
      });
      this.setState({ orderForm: initialStateForm });
      this.props.onInitFalseStateCreateAppointmentStatus();
      this.setState({
        openAppointmentDetails: true,
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
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    let enddate =
      formData.endDate.split("-")[0] +
      "/" +
      formData.endDate.split("-")[1] +
      "/" +
      formData.endDate.split("-")[2];
    let startdate =
      formData.startDate.split("-")[0] +
      "/" +
      formData.startDate.split("-")[1] +
      "/" +
      formData.startDate.split("-")[2];
    let topics = [];
    formData.topics.split(",").map(x => topics.push({ topic: x }));
    let userInfo = null;
    if (typeof formData.friendList === "object") {
      userInfo = formData.friendList;
    } else {
      userInfo = JSON.parse(formData.friendList);
    }

    let location = null;
    if (typeof formData.location === "object") {
      location = formData.location;
    } else {
      location = JSON.parse(formData.location);
    }

    const appointmentInformation = {
      avatar: userInfo.avatar,
      email: userInfo.email,
      enddate: enddate + " " + formData.endTime + ":01",
      first_name: userInfo.first_name,
      gender: "Male",
      last_name: userInfo.last_name,
      location: [location],
      phone: userInfo.phone,
      startdate: startdate + " " + formData.startTime + ":01",
      status: "pending",
      topics: topics
    };

    this.props.onInitCreateAppointment(appointmentInformation);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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
      editableContentAppointmentDetails: false
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
      editableContentAppointmentDetails: true
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
          createAppointmentForm={this.state.orderForm}
          createAppointmentHandler={this.createAppointmentHandler}
          inputChangedHandler={this.inputChangedHandler}
        />
      );
    } else if (this.state.openAppointmentDetails) {
      console.log("Open Details");
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
    createAppointmentSucess: state.homePage.createAppointmentSucess
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
      dispatch(actions.setFalseStateCreateAppointmentStatus())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
