import React from "react";

//Components
import Input from "../UI/Input/Input";
// Style files
import "./CreateAppointmentForm.scss";

const createAppointmentForm = props => {
  const formElementsArray = [];
  let errorMessage = null;
  for (let key in props.createAppointmentForm) {
    formElementsArray.push({
      id: key,
      config: props.createAppointmentForm[key]
    });
  }

  let form = (
    <form onSubmit={props.createAppointmentHandler} className="form-create">
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
          changed={event => props.inputChangedHandler(event, formElement.id)}
          isEditable={true}
          formIsValid={props.formIsValid}
        />
      ))}

      <button className="create-appointment" title="Create Appointment">
        Create Appointment
      </button>
    </form>
  );

  if (!props.formIsValid) {
    errorMessage = (
      <div className="error-message">
        <h6 className="error-message--title">Enter a valid date</h6>
      </div>
    );
  }

  return (
    <div className="create-appointment-form">
      <h3 className="create-appointment-form--title">Create an Appointment</h3>
      {errorMessage}
      {form}
    </div>
  );
};

export default createAppointmentForm;
