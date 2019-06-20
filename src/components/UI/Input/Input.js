import React from "react";

//Style Files
import "./Input.scss";
//Util Functions
import { formattedDateInput } from "../../../utils/Functions";

const input = props => {
  let formattedDate = formattedDateInput(),
    inputClasses = ["input-block--time-and--date--input"],
    inputElement = null;

  if (!props.formIsValid) {
    inputClasses.push("Invalid");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className="input-block--time-and--date--input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          required
          disabled={!props.isEditable}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className="input-block--time-and--date--input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          rows="4"
          cols="30"
          maxLength="100"
          required
          disabled={!props.isEditable}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className="input-block--time-and--date--input"
          value={props.value}
          multiple={false}
          onChange={props.changed}
          disabled={!props.isEditable}
        >
          {props.elementConfig.options.map((option, index) => (
            <option key={index} value={JSON.stringify(option.value)}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "date":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          min={formattedDate}
          onChange={props.changed}
          required
          disabled={!props.isEditable}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          max="23:59:00"
          required
          disabled={!props.isEditable}
        />
      );
  }

  return (
    <div className="input-block">
      <label className="input-block--label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
