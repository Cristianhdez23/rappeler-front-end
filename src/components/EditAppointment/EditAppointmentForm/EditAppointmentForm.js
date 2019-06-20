import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Input from "../../UI/Input/Input";
//Actions
import * as actions from "../../../containers/AppointmentSection/AppointmentSectionActions";
//Style Files
import "./EditAppointmentForm.scss";

class EditAppointmentForm extends Component {
  state = {
    editState: null
  };

  componentWillMount() {
    this.setState({ editState: this.props.isEditable });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.appointmentInformation !== this.props.appointmentInformation
    ) {
      this.setState({ editState: this.props.isEditable });
    } else {
      if (
        this.props.isEditable !== this.state.editState &&
        !this.state.editState
      ) {
        this.setState({ editState: this.props.isEditable });
      }
    }
  }

  enableEditingHandler = event => {
    this.setState({ editState: true });
    event.target.blur();
  };

  changeAppointmentStatusToConfirmed = event => {
    event.stopPropagation();
    this.props.onInitChangeAppointmentStatus(
      this.props.appointmentInformation,
      "confirmed"
    );
  };

  changeAppointmentStatusToCancelled = event => {
    event.stopPropagation();
    this.props.onInitChangeAppointmentStatus(
      this.props.appointmentInformation,
      "cancelled"
    );
  };

  render() {
    const formElementsArray = [];
    let errorMessage = null;
    for (let key in this.props.editAppointmentForm) {
      formElementsArray.push({
        id: key,
        config: this.props.editAppointmentForm[key]
      });
    }

    let form = (
      <form
        className="form-edit"
        onSubmit={event =>
          this.props.editAppointmentHandler(
            event,
            this.props.appointmentInformation
          )
        }
      >
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            label={formElement.config.label}
            changed={event =>
              this.props.inputChangedHandler(event, formElement.id, null)
            }
            isEditable={this.state.editState}
            formIsValid={this.props.formIsValid}
          />
        ))}

        <button
          className={[this.state.editState ? "btn-save-changes" : "btn-hide"]}
          title="Save Changes"
        >
          Save Changes
        </button>
      </form>
    );
    if (!this.props.formIsValid) {
      errorMessage = (
        <div className="error-message">
          <h6 className="error-message--title" role="status">Enter a valid date</h6>
        </div>
      );
    }
    return (
      <section className="edit-appointment-form">
        <div className="edit-appointment-form-block">
          {errorMessage}
          <div className="edit-appointment-btn-block">
            <button
              onClick={this.enableEditingHandler}
              className={[
                this.props.appointmentInformation.status === "cancelled"
                  ? "btn-hide"
                  : "edit-appointment-btn-block--btn",
                this.state.editState ? "isEditable" : null
              ].join(" ")}
              title="Enable edition" 
              aria-label="Enable edition"
            >
              <span className="fas fa-edit" />
            </button>
          </div>
          {form}z
        </div>
        <div className="confirm-cancell-btn-block">
          <button
            className={[
              this.props.appointmentInformation.status === "cancelled"
                ? "btn-hide"
                : "confirm-appointment-btn",
              this.props.appointmentInformation.status === "confirmed"
                ? "btn-hide"
                : null,
              this.state.editState ? "btn-hide" : null
            ].join(" ")}
            onClick={this.changeAppointmentStatusToConfirmed}
            title="Confirm Appointment"
          >
            Confirm Appointment
          </button>
          <button
            className={[
              this.props.appointmentInformation.status === "cancelled"
                ? "btn-hide"
                : "cancel-appointment-btn",
              this.state.editState ? "btn-hide" : null
            ].join(" ")}
            onClick={this.changeAppointmentStatusToCancelled}
            title="Cancel Appointment"
          >
            Cancel Appointment
          </button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitChangeAppointmentStatus: (appointmentData, newStatus) =>
      dispatch(actions.initChangeAppointmentStatus(appointmentData, newStatus))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditAppointmentForm);
