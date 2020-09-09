import React, { Component } from "react";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
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

import "../styles/AllDeckList.css";

import OpenIconSpeedDial from "./speedDial/OpenIconSpeedDial";

export default class AllDeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingCate: false,
      addingDeck: false,
      category: "", // 입력창 카테고리
      categories: [], // DB 카테고리 배열
      deck: "",
      decks: [],
    };
    this.handleCategory = this.handleCategory.bind(this);
    this.addCategory = this.addCategory.bind(this);
  }

  componentDidMount(data) {
    let categoryRef = database.collection("categories");
    const { categories } = this.state;

    categoryRef.get().then((querySnapshot) => {
      let allCategories = querySnapshot.docs.map((doc) => doc.id);
      this.setState({ categories: allCategories });
    });
  }

  handleCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  handleDeck(e) {
    this.setState({
      deck: e.target.value,
    });
  }

  registerCategory(e) {
    database
      .collection("categories")
      .doc(e.target.value)
      .set({
        category: e.target.value,
      })
      .then((docRef) => {
        if (docRef) {
          this.setState({
            addCate: false,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  addCategory() {
    this.setState({
      addingCate: true,
    });
  }

  // addCategoryTree(categories) {

  // }

  addDeck() {
    this.setState({
      addingDeck: true,
    });
  }

  render() {
    const { addingCate, addingDeck, category, categories, deck } = this.state;
    const {
      handleCategory,
      handleDeck,
      addCategory,
      addDeck,
      registerCategory,
    } = this;

    console.log(categories);

    return (
      <div className="AllDeckList">
        <div className="deck_trees">
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {categories.map((category, i) => {
              return (
                <TreeItem key={i} nodeId={i.toString()} label={category}>
                  {/* <TreeItem nodeId="1" label="Basic" /> */}

                  <TextField
                    onChange={handleDeck}
                    value={deck}
                    variant="outlined"
                    style={addingDeck ? {} : { display: "none" }}
                  />
                  {/* <TreeItem>
                  </TreeItem> */}
                </TreeItem>
              );
            })}
          </TreeView>
          {/* <Tooltip title="add deck" placement="left">
            <AddIcon onClick={addDeck} />
          </Tooltip> */}
        </div>
        <TextField
          value={category}
          variant="outlined"
          onChange={handleCategory}
          onBlur={registerCategory}
          style={addingCate ? {} : { display: "none" }}
        />

        <IconButton edge="end" onClick={addCategory}>
          <AddCircleIcon />
        </IconButton>
      </div>
    );
  }
}
