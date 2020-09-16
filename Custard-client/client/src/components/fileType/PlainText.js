import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";

import Button from "@material-ui/core/Button";

import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";

import AddCardField from "../field/AddCardField";
import AddCardType from "../selectMenu/AddCardType";

import "../../styles/PlainText.css";

export default function PlainText({ category, deck, registerCard }) {
  const formInputs = {
    cardType: "",
    Question: "",
    Answer: "",
    Hint: "",
  };
  let [cardForm, setCardForm] = useState([formInputs]);

  //* Formik props
  const initialValues = {
    addCardForm: cardForm,
  };

  const onSubmit = (values, actions) => {
    console.log(values);
    registerCard(values.addCardForm);
    // 입력창 초기화
    actions.resetForm({
      values: {
        addCardForm: cardForm,
      },
    });
  };

  return (
    <div className="PlainText">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <FieldArray key={deck} name="addCardForm">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { addCardForm } = form.values;
              console.log(addCardForm);
              return addCardForm.map((form, index) => (
                <div key={index} className="addCardField_container">
                  <AddCardType index={index} />
                  <AddCardField index={index} name="Question" />
                  <AddCardField index={index} name="Answer" />
                  <AddCardField index={index} name="Hint" />
                  <AddBoxTwoToneIcon
                    onClick={() => push(formInputs)}
                    className="addCardField_button"
                  />
                  <IndeterminateCheckBoxTwoToneIcon
                    onClick={() => remove(index)}
                    className="addCardField_button"
                  />
                </div>
              ));
            }}
          </FieldArray>
          <div className="addCardField_submit">
            <Button type="submit" variant="outlined">
              Add Card
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
