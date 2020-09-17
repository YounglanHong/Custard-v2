import React from "react";

import { Field } from "formik";

import "../../styles/Card.css";

export default function CardField({
  cardKey,
  index,
  item,
  isEditing,
  startEditing,
  editCard,
  value,
}) {
  return (
    <div className="CardField">
      <h4 className="cardField_heading">
        {item}.{index + 1}
      </h4>
      {isEditing ? (
        <div>
          <Field
            component="textarea"
            // rows="10"
            placeholder={value}
            className="cardField_input_editing"
            name={`cardForm[${index}][${item}]`}
            onKeyUp={() => editCard(cardKey)}
          />
          Press Enter
        </div>
      ) : (
        <Field
          component="textarea"
          // rows="10"
          className="cardField_input"
          value={value}
          onFocus={() => startEditing(index)}
        />
      )}
    </div>
  );
}
