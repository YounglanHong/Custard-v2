import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";

import Button from "@material-ui/core/Button";

import AddBoxTwoToneIcon from "@material-ui/icons/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@material-ui/icons/IndeterminateCheckBoxTwoTone";

import AddCardField from "../field/AddCardField";
import AddCardType from "../selectMenu/AddCardType";

import "../../styles/PlainText.css";

export default function PlainText({ category, deck, registerCard, cardData }) {
  console.log("json", cardData);
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
    // console.log(values.addCardForm);
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
              return addCardForm.map((form, index) => (
                <div key={index} className="addCardField_container">
                  {cardData ? (
                    cardData.map((data, dataIndex) => {
                      /* [조건] Plain Text를 제외하고, 데이터 존재하는 경우*/
                      //TODO: 중복 mapping 해결(cardType)
                      console.log(data);
                      return (
                        <div key={dataIndex}>
                          <AddCardType index={dataIndex} />
                          <AddCardField
                            index={index}
                            name="Question"
                            value={data.translation}
                          />
                          <AddCardField
                            index={index}
                            name="Answer"
                            value={data.subtitle}
                          />
                          <AddCardField
                            index={index}
                            name="Hint"
                            value={data.videoTitle}
                          />
                          <hr className="addCardField_divider"></hr>
                        </div>
                      );
                    })
                  ) : (
                    /* [조건] Plain Text의 경우(직접 데이터 입력)*/
                    <div key={index}>
                      <AddCardType index={index} />
                      <AddCardField index={index} name="Question" />
                      <AddCardField index={index} name="Answer" />
                      <AddCardField index={index} name="Hint" />
                      <div className="addCardField_button">
                        <AddBoxTwoToneIcon
                          onClick={() => push(formInputs)}
                          style={{ marginRight: "5px" }}
                        />
                        <IndeterminateCheckBoxTwoToneIcon
                          onClick={() => remove(index)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ));
            }}
          </FieldArray>
          <div className="addCardField_submit">
            <Button type="submit" variant="contained" fullWidth>
              Add Card
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
