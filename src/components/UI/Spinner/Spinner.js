import React from "react";

import "./Spinner.scss";

const spinner = () => {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default spinner;
