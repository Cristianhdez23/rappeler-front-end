import React from "react";

import classes from "./Input.css";

const input = props => {
  let date = new Date();
  let day = date.getDate();
  let year = date.getFullYear();
  let month = `${date.getMonth() < 10 ? "0" : ""}${date.getMonth() + 1}`;
  let formatDate = year + "-" + month + "-" + day;

  let hour = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}`;
  let minutes = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
  let minTime =hour+":"+minutes+":00";

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          required
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          rows="4"
          cols="30"
          required
        />
      );
      break;
    case "select":

      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          multiple={false}
          onChange={props.changed}
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
          min={formatDate}
          onChange={props.changed}
          required
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
          min={minTime}
          max="23:59:00"
          required
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
