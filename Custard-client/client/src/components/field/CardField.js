import React from "react";

import { Field } from "formik";

import "../../styles/Card.css";

export default function CardField({ name }) {
  return (
    <div className="CardField">
      <h4 className="cardField_heading">{name}.</h4>
      <Field rows="10" className="cardField_text" name={name} />
    </div>
  );
}
