import React from "react";
import { ErrorItem } from "./error_item.jsx";

export const Errors = (props) => {
  const error_items = props.errors.map(
    (error, idx) => { return <ErrorItem key={idx} error={error} />; }
    );

  return <ul className="errors">{error_items}</ul>;

};
