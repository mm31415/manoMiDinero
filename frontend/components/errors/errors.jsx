import React from "react";
import { ErrorItem } from "./error_item.jsx";

export const Errors = (props) => {
  const error_items = props.errors.map(
    (error) => { return <ErrorItem error={error} />; }
    );

  return <ul>{error_items}</ul>;
};
