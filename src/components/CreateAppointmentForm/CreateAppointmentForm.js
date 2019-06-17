import React from 'react';

import Input from "../UI/Input/Input";
import Spinner from "../UI/Spinner/SectionSpinner/SectionSpinner";

const createAppointmentForm = (props) => {
    const formElementsArray = [];
    for (let key in props.createAppointmentForm) {
        formElementsArray.push({
            id: key,
            config: props.createAppointmentForm[key]
        });
    }
    let form = (
        <form onSubmit={props.createAppointmentHandler}>
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
                />
            ))}

            <button>Create Appointment</button>
        </form>
    );
    // if (this.props.loading) {
    //   form = <Spinner />;
    // }
    return <div>{form}</div>;

};

export default createAppointmentForm;
