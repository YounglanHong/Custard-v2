import React from "react";

import { Field } from "formik";

import "../../styles/Card.css";

export default function CardField({
  cardKey,
  index,
  targetIndex,
  item,
  isEditing,
  startEditing,
  value,
}) {
  return (
    <div className="CardField">
      <h4 className="cardField_heading">
        {item}.{index + 1}
      </h4>
      {index === targetIndex && isEditing ? (
        <Field
          component="textarea"
          placeholder={value}
          className="cardField_input_editing"
          name={`cardForm[${index}][${item}]`}
        />
      ) : (
        <div>
          <Field
            component="textarea"
            className="cardField_input"
            value={value}
            onFocus={() => startEditing(index)}
          />
          <span className="cardField_notice">Click to Edit</span>
        </div>
      )}
    </div>
  );
}
