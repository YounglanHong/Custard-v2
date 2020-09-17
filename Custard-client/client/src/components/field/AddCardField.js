import React from "react";
import { Field } from "formik";

import "../../styles/AddCard.css";

//* addCard 입력창(Question,Answer,Hint)
export default function AddCardField({ index, name }) {
  return (
    <div key={index} className="addCardField">
      <h4 className="addCardField_heading">{name}</h4>
      <Field
        component="textarea"
        name={`addCardForm[${index}][${name}]`}
        className="addCardField_input"
        placeholder={name}
      />
    </div>
  );
}
