import React from "react";
import { Field } from "formik";

export default function CardType({ index }) {
  //* Card - card type
  // FIX: Modify from material-ui Menu to Formik Field select

  return (
    <Field
      as="select"
      name={`cardForm[${index}]["cardType"]`}
      className="cardField_select"
    >
      <option value="">SELECT CARDTYPE</option>
      <option value="Flashcard">Flashcard</option>
      <option value="FillInTheBlanks">Fill-in-the-blanks</option>
    </Field>
  );
}
