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
  let [index, setIndex] = useState(0); //* 특정 카드 입력창 수정 시 index
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
    setIndex(index);
    setIsEditing(true);
  }

  function editCard(key /* categoryTitle, deckTitle */) {
    let cardRef = database
      .ref("cards")
      .child(categoryTitle)
      .child(deckTitle)
      .child(key);

    if (window.event.keyCode === 13) {
      cardRef.update({ cards: value }).then(() => {
        setIsEditing(false); // 수정 완료
        setValue(""); // 입력창 초기화
      });
      getCard(); // 변경사항 호출
    }
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

  const onSubmit = (values, actions) => {
    console.log(values);
  };

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
              onSubmit={onSubmit}
            >
              <Form className="card_text">
                <div className="card_cardtype">
                  <span>{cardType}</span>
                </div>
                <CardField
                  index={index}
                  item="Question"
                  isEditing={isEditing}
                  startEditing={startEditing}
                  editCard={editCard}
                  value={Question}
                  cardKey={cardKey}
                />
                <CardField
                  index={index}
                  item="Answer"
                  isEditing={isEditing}
                  startEditing={startEditing}
                  editCard={editCard}
                  value={Answer}
                  cardKey={cardKey}
                />
                <CardField
                  index={index}
                  item="Hint"
                  isEditing={isEditing}
                  startEditing={startEditing}
                  editCard={editCard}
                  value={Hint}
                  cardKey={cardKey}
                />
                <div className="card_buttons">
                  {/* <Button type="submit">
                    <Tooltip title="edit card" placement="left">
                      <EditIcon
                        style={{ fontSize: "13pt" }}
                        onClick={() => startEditing(index)}
                      />
                    </Tooltip>
                  </Button> */}
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
