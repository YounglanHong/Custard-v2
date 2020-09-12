import React, { useState, useEffect, createRef } from "react";
import { Formik, Form, Field } from "formik";

import Decks from "./Decks";
// import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleIcon from "@material-ui/icons/AddCircle";

//* Tree view
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import database from "../firebase";

import "../styles/Category.css";

export default function Category() {
  let [addingCategory, setAddingCategory] = useState(false);
  let [categories, setCategories] = useState([]);

  //* 카테고리 정보 가져오기(firebase)
  function getCategory() {
    let categoryRef = database.ref("categories/");

    categoryRef.on("value", (snapshot) => {
      // let categoryIds = Object.keys(snapshot.val());
      // let categoryValues = Object.values(snapshot.val());

      let categoryObj = snapshot.val();
      let categoryArray = [];
      for (let id in categoryObj) {
        categoryArray.push([id, categoryObj[id].category]);
      }
      setCategories(categoryArray);
    });
  }

  useEffect(() => {
    getCategory();
  }, []);

  //* 카테고리, 덱 등록
  function registerCategory(category) {
    database
      .ref("categories")
      .push({
        category: category,
      })
      .then(() => {
        setAddingCategory(false);
      })
      .catch((err) => alert("Error: ", err));
  }

  function addCategory() {
    setAddingCategory(!addingCategory);
  }

  //* 카테고리 map 함수
  function categoryMap() {
    return categories.map((category, i) => {
      return (
        <TreeItem key={i} nodeId={category[0]} label={category[1]}>
          <Decks category={category[1]} />
        </TreeItem>
      );
    });
  }

  const initialValues = {
    category: "category name",
  };

  const onSubmit = (values) => {
    registerCategory(values.category);
    getCategory();
  };

  return (
    <div className="Category">
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <div className="category-container">{categoryMap()}</div>
      </TreeView>

      <div className="addCategory">
        <Tooltip title="add category" placement="bottom">
          <IconButton
            edge="end"
            onClick={addCategory}
            style={{ color: "rgb(102, 69, 69)" }}
            className="addCategory-button"
          >
            <AddCircleIcon className="addCategory-icon" />
          </IconButton>
        </Tooltip>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form
            className="addCategory-form"
            style={addingCategory ? {} : { display: "none" }}
          >
            <Field type="text" className="addCategory-input" name="category" />
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
// }
