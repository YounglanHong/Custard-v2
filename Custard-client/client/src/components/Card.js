import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import CardType from "./selectMenu/CardType";
import CardField from "./field/CardField";

import "../styles/Card.css";

import database from "../firebase";

export default function Card({ categoryTitle, deckTitle }) {
  let [cardLists, setCardLists] = useState([]);
  let [isEditing, setIsEditing] = useState(false);
  let [targetIndex, setTargetIndex] = useState(0); //* 특정 카드 입력창 수정 시 index
  let [value, setValue] = useState(""); //* 특정 카드 입력창 수정 시 inputText

  const formInputs = {
    cardType: "",
    Question: "",
    Answer: "",
    Hint: "",
  };
  let [cardForm, setCardForm] = useState([formInputs]);

  //* 카드 정보 가져오기(firebase)
  function getCard() {
    let cardRef = database.ref("cards").child(categoryTitle).child(deckTitle);

    cardRef.on("value", (snapshot) => {
      let cardArray = [];
      snapshot.forEach((childSnapshot) => {
        cardArray.push([childSnapshot.key, childSnapshot.val().cards]);
      });
      setCardLists(cardArray);
    });
  }

  useEffect(() => {
    getCard();
  }, []);

  //* 카드 수정
  function startEditing(index) {
    setTargetIndex(index); //* 수정하려는 카드 index 저장
    setIsEditing(true);
  }

  function editCard(key, value) {
    let cardRef = database
      .ref("cards")
      .child(categoryTitle)
      .child(deckTitle)
      .child(key);

    cardRef.update({ cards: value }).then(() => {
      setIsEditing(false); // 수정 완료
      setValue(""); // 입력창 초기화
    });
    getCard(); // 변경사항 호출
  }

  //* 카드 삭제
  function deleteCard(cardKey) {
    let cardRef = database.ref("cards").child(categoryTitle).child(deckTitle);

    cardRef
      .child(cardKey)
      .remove()
      .then(() => {
        getCard();
      })
      .catch((err) => alert("Error: ", err));
  }

  //* Formik props
  const initialValues = {
    cardForm: cardForm,
  };

  // const onSubmit = (values, actions) => {
  //   // editCard(values.cardForm);
  //   console.log(values);
  // };

  return (
    <div id="Card">
      <div className="card_container">
        <header className="card_header">
          <h3>
            {categoryTitle}: {deckTitle}
          </h3>
          <Button id="card_study_button">Study</Button>
        </header>

        {cardLists.map((cardList, index) => {
          let cardKey = cardList[0];
          let cardObject = cardList[1];

          let { Question, Answer, Hint, cardType } = cardObject;

          return (
            <Formik
              key={cardKey}
              initialValues={initialValues}
              onSubmit={(values) => editCard(cardKey, values.cardForm[index])}
            >
              <Form className="card_text">
                <div className="card_cardtype">
                  {isEditing ? (
                    <CardType index={index} />
                  ) : (
                    <span>{cardType}</span>
                  )}
                </div>
                <CardField
                  index={index}
                  item="Question"
                  isEditing={isEditing}
                  startEditing={startEditing}
                  value={Question}
                  targetIndex={targetIndex}
                />
                <CardField
                  index={index}
                  item="Answer"
                  isEditing={isEditing}
                  startEditing={startEditing}
                  value={Answer}
                  targetIndex={targetIndex}
                />
                <CardField
                  index={index}
                  item="Hint"
                  isEditing={isEditing}
                  startEditing={startEditing}
                  value={Hint}
                  targetIndex={targetIndex}
                />
                <div className="card_buttons">
                  <Button type="submit">
                    <Tooltip title="edit card" placement="left">
                      <EditIcon
                        style={
                          isEditing
                            ? { display: "block", fontSize: "13pt" }
                            : { display: "none" }
                        }
                      />
                    </Tooltip>
                  </Button>
                  <Button>
                    <Tooltip title="delete card" placement="right">
                      <DeleteIcon
                        style={{ fontSize: "13pt" }}
                        onClick={() => deleteCard(cardKey)}
                      />
                    </Tooltip>
                  </Button>
                </div>
              </Form>
            </Formik>
          );
        })}
        <div className="registerCard_button">
          <Button variant="outlined" fullWidth>
            <Link
              className="registerCard_link"
              to={`/addCard/${categoryTitle}/${deckTitle}`}
            >
              Register New Card
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
