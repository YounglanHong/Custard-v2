import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";

import DeckField from "./field/DeckField";

import database from "../firebase";

import "../styles/Decks.css";

export default function Decks({ category, categoryKey }) {
  let [deckList, setDeckList] = useState([]);
  let [editingDeck, setEditingDeck] = useState(false); //* 덱 수정 상태
  let [index, setIndex] = useState(0); //* 특정 덱 수정 시 index
  let [value, setValue] = useState(""); //* 특정 덱 수정 시 inputText

  //* 덱 정보 가져오기(firebase)
  const getDeck = useCallback(() => {
    let deckRef = database.ref("decks").child(category);
    let deckArray = [];
    deckRef.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        // console.log(childSnapshot.key, childSnapshot.val().decks);
        deckArray.push([childSnapshot.key, childSnapshot.val().decks]);
      });
      setDeckList(deckArray);
    });
  }, [category]);

  useEffect(() => {
    getDeck();
  }, [getDeck]);

  //* 덱 등록
  function registerDeck(decks) {
    let deckRef = database.ref("decks").child(category);
    // 한 개만 등록 할 때
    if (decks.length === 1) {
      deckRef
        .push({ decks: decks })
        .then(() => {
          console.log(decks);
        })
        .catch((err) => alert("Error: ", err));

      // 여러 개 등록 할 때
    } else if (decks.length > 1) {
      decks.forEach((deck) => {
        deckRef
          .push({ decks: deck })
          .then(() => {
            console.log(deck);
          })
          .catch((err) => alert("Error: ", err));
      });
    }
  }

  //* 덱 수정
  function startEditing(index) {
    // index 값이 동일할 때만 수정 시작
    setIndex(index);
    setEditingDeck(true);
  }

  function handleEditInput(e) {
    setValue(e.target.value);
  }

  function editDeck(key, categoryTitle) {
    let deckRef = database.ref("decks").child(categoryTitle).child(key);

    if (window.event.keyCode === 13) {
      deckRef.update({ decks: value }).then(() => {
        setEditingDeck(false); // 수정 완료
        setValue(""); // 입력창 초기화
      });
      getDeck(); // 변경사항 호출
    }
  }

  //* 덱 삭제
  function deleteDeck(key, categoryTitle) {
    let deckRef = database.ref("decks").child(categoryTitle).child(key);

    deckRef
      .remove()
      .then(() => {
        getDeck(); // 변경사항 호출
      })
      .catch((err) => alert("Error: ", err));
  }

  //* 덱 map 함수
  // w/ 덱 리스트 & 수정, 삭제 버튼
  function deckMap() {
    // deck[0]: deckKey, deck[1]: deckTitle
    return (
      <ul className="deck-lists">
        {deckList.map((deck, i) => {
          let deckKey = deck[0];
          let deckTitle = deck[1];
          return (
            <li key={i} className="deck-list">
              {editingDeck && i === index ? (
                <>
                  <input
                    className="editDeck-input"
                    placeholder={deckTitle}
                    value={value}
                    onChange={handleEditInput}
                    onKeyUp={() => editDeck(deckKey, category)}
                  />
                  <span className="editDeck-notice">Press Enter</span>
                </>
              ) : (
                <Link
                  className="deck-list-link"
                  to={`/card/${category}/${deckTitle}`}
                >
                  <span className="deck-list-item">{deckTitle}</span>
                </Link>
              )}
              <span className="deck-list-icons">
                <Tooltip title="edit" placement="top">
                  <IconButton type="submit" onClick={() => startEditing(i)}>
                    <EditIcon style={{ fontSize: "12pt" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="delete" placement="top">
                  <IconButton
                    type="submit"
                    onClick={() => deleteDeck(deckKey, category)}
                  >
                    <DeleteIcon style={{ fontSize: "12pt" }} />
                  </IconButton>
                </Tooltip>
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  //* Formik props
  const initialValues = {
    decks: [""],
  };

  const onSubmit = (values, actions) => {
    registerDeck(values.decks);
    getDeck();
    // 입력창 초기화
    actions.resetForm({
      values: {
        decks: [""],
      },
    });
  };

  //* 덱 입력창 추가 또는 삭제(FieldArray)
  function addDecksMap() {
    return (
      <FieldArray name="decks">
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { decks } = form.values;
          return (
            <div>
              {decks &&
                decks.map((deck, index) => (
                  <DeckField
                    key={index}
                    index={index}
                    push={push}
                    remove={remove}
                  />
                ))}
            </div>
          );
        }}
      </FieldArray>
    );
  }

  return (
    <div className="Decks">
      <div className="deck-container">{deckMap()}</div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          {addDecksMap()}

          {/* //* 덱 추가 */}
          <Tooltip title="add deck" placement="bottom">
            <IconButton type="submit" className="addDeck-button">
              <AddIcon style={{ fontSize: "13pt" }} />
            </IconButton>
          </Tooltip>
        </Form>
      </Formik>
    </div>
  );
}
