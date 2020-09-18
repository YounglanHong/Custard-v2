import React from "react";
import { Field } from "formik";

import "../../styles/AddCard.css";

//* addCard 입력창(Question,Answer,Hint)
export default function AddCardField({ index, name, value }) {
  return (
    <div key={index} className="addCardField">
      {console.log(value)}
      <h4 className="addCardField_heading">{name}</h4>
      <Field
        component="textarea"
        name={`addCardForm[${index}][${name}]`}
        className="addCardField_input"
        value={value}
        placeholder={name}
      />
    </div>
  );
}
