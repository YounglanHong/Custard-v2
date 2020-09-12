import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";

import database from "../firebase";

import "../styles/Deck.css";

export default function Decks({ category }) {
  // let [addingDeck, setAddingCategory] = useState(false);
  let [decks, setDecks] = useState([""]);

  //* 덱 정보 가져오기(firebase)
  //   function getCategory() {
  //     let categoryRef = database.ref("categories/");

  //     categoryRef.on("value", (snapshot) => {
  //       setCategories(Object.values(snapshot.val()));
  //     });
  //   }

  //* 덱 등록
  // function registerCategory(category) {
  //     let categoryKey = database.ref().child("categories").push().key;

  //     database
  //       .ref("categories")
  //       // .child(categoryKey)
  //       .push({
  //         category: category,
  //       })
  //       .then(() => {
  //         // this.setState({
  //         //   addingCategory: false,
  //         //   categoryInput: "", // 초기화
  //         // });
  //         setAddingCategory(false);
  //       })
  //       .catch((err) => alert("Error: ", err));
  //   }

  //   function registerDeck() {
  //     let categoryKey = database.ref().child("categories").push().key;

  //     database
  //       .ref(categoryKey)
  //       .child("categories")
  //       .set({
  //         deck: this.state.deckInput,
  //       })
  //       .then(() => {
  //         // this.setState({
  //         //   addingDeck: false,
  //         //   deckInput: "", // 초기화
  //         // });
  //       })
  //       .catch((err) => alert("Error: ", err));
  //   }
  // function addDeck() {
  //   console.log(this.state.addingDeck);
  //   this.setState({
  //     addingDeck: true,
  //   });
  // }

  const initialValues = {
    // category: "Type Category Name",
    // deck: "Type Deck Name",
  };

  const onSubmit = (values) => {
    // registerCategory(values.category);
    // getCategory();
  };

  return (
    <div className="Decks">
      <div className="deck-container">
        <ul className="deck-lists">
          <li className="deck-list"></li>
        </ul>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <FieldArray type="text" className="decks" name="decks"></FieldArray>
            <Tooltip title="add" placement="bottom">
              <IconButton type="submit">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
