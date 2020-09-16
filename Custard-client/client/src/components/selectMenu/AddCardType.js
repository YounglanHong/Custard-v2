import React from "react";
import { Field } from "formik";

export default function AddCardType({ index }) {
  //* AddCard - card type: card_type(안쪽 메뉴)
  // FIX: Modify from material-ui Menu to Formik Field select

  return (
    <Field
      as="select"
      name={`addCardForm[${index}]["cardType"]`}
      className="addCardField_select"
    >
      <option value="">Select cardtype</option>
      <option value="Flashcard">Flashcard</option>
      <option value="FillInTheBlanks">Fill-in-the-blanks</option>
    </Field>
  );
}
