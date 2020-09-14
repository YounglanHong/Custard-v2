import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import Decks from "./Decks";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";

//* Tree view
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import database from "../firebase";

import "../styles/Category.css";

export default function Category() {
  let [categories, setCategories] = useState([]);
  let [editingCategory, setEditingCategory] = useState(false); //* 카테고리 수정 상태
  let [index, setIndex] = useState(0); //* 특정 카테고리 수정 시 index
  let [value, setValue] = useState(""); //* 특정 카테고리 수정 시 inputText

  //* 카테고리 정보 가져오기(firebase)
  function getCategory() {
    let categoryRef = database.ref("categories/");

    categoryRef.on("value", (snapshot) => {
      // let categoryIds = Object.keys(snapshot.val())
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

  //* 카테고리 등록
  function registerCategory(category) {
    database
      .ref("categories")
      .push({
        category: category,
      })
      .then(() => {
        console.log(category);
      })
      .catch((err) => alert("Error: ", err));
  }

  //* 카테고리 삭제
  function deleteCategory(key) {
    let categoryRef = database.ref("categories");
    let childRef = categoryRef.child(key);
    // console.log(childRef);

    //TODO: 모달창
    childRef
      .remove()
      .then(() => {
        console.log("success");
      })
      .catch((err) => alert("Error: ", err));
  }

  //* 카테고리 수정
  function startEditing(index) {
    // index 값이 동일할 때만 수정 시작
    setIndex(index);
    setEditingCategory(true);
  }

  function handleEditInput(e) {
    setValue(e.target.value);
  }

  function editCategory(key) {
    let categoryRef = database.ref("categories");
    let childRef = categoryRef.child(key);
    if (window.event.keyCode === 13) {
      childRef.update({ category: value }).then(() => {
        setEditingCategory(false); // 수정 완료
        setValue(""); // 입력창 초기화
      });
    }
  }

  //* 카테고리 map 함수
  // w/ 카테고리 리스트 & 수정, 삭제 버튼
  function categoryMap() {
    // category[0]: categoryKey, category[1]: categoryTitle
    return categories.map((category, i) => {
      return (
        <TreeItem
          key={i}
          nodeId={category[0]}
          label={
            <div className="category-list">
              {editingCategory && i === index ? (
                <>
                  <input
                    className="editCategory-input"
                    placeholder={category[1]}
                    value={value}
                    onChange={handleEditInput}
                    onKeyUp={() => editCategory(category[0])}
                  />
                  <span className="editCategory-notice">Press Enter</span>
                </>
              ) : (
                <span className="category-list-item">{category[1]}</span>
              )}
              <span className="category-list-icons">
                <Tooltip title="edit" placement="top">
                  <IconButton type="submit" onClick={() => startEditing(i)}>
                    <EditIcon style={{ fontSize: "14pt" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="delete" placement="top">
                  <IconButton
                    type="submit"
                    onClick={() => deleteCategory(category[0])}
                  >
                    <DeleteIcon style={{ fontSize: "14pt" }} />
                  </IconButton>
                </Tooltip>
              </span>
            </div>
          }
        >
          <Decks category={category[1]} categoryKey={category[0]} />
        </TreeItem>
      );
    });
  }

  //* Formik props
  const initialValues = {
    category: "",
  };

  const onSubmit = (values, actions) => {
    registerCategory(values.category);
    getCategory();
    // 입력창 초기화
    actions.resetForm({
      values: {
        category: "",
      },
    });
  };

  return (
    <div className="Category">
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <div className="category-container">{categoryMap()}</div>
      </TreeView>

      {/* //* 카테고리 추가 */}
      <div className="addCategory">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="addCategory-form">
            <Field
              type="text"
              className="addCategory-input"
              name="category"
              placeholder="category name"
            />
            <Tooltip title="add category" placement="bottom">
              <IconButton type="submit">
                <AddIcon style={{ fontSize: "13pt" }} />
              </IconButton>
            </Tooltip>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
