import React, { Component } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
//import { DeleteIcon, AddIcon, EditIcon, AddCircle } from "@material-ui/icons";
//import TreeView from "../src/react-treeview";

import "../styles/AllDeckList.css";
import OpenIconSpeedDial from "./speedDial/OpenIconSpeedDial";
//import BasicCheckbox from "./BasicCheckbox";

//TODO: edit 함수들 작성해야함

export default class AllDeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speedDialActions: [
        {
          icon: <AddIcon onClick={this.props.activateInput} />,
          name: "add category",
        },
      ],
      //* decks: this.props.decks,
      //? decks => category
      // category: "this.props.category",
      category: "",
      addingFirstDeckToCategory: false,
    };
    this.newCategory = React.createRef(); //? 쓸모...?
    this.addFirstDeckToCategory = this.addFirstDeckToCategory.bind(this);
  }

  addFirstDeckToCategory() {
    console.log("no empty category");
    this.setState({ addingFirstDeckToCategory: true });
  }

  //TODO: category 수정할 때도 옆에 <EditIcon /> 눌렀을 시에만 수정 가능하도록 해야함
  //toggleAttribute라는 기능이 있는 거 같던데 참고
  handleAddDeckButtonClick(e) {
    console.log(e.target);
    if (e.target.parentElement.parentElement.className === "caret") {
      e.target.parentElement.parentElement.className = "caret-down";
    }
    if (e.target.parentElement.nextSibling.children[0]) {
      if (
        e.target.parentElement.nextSibling.children[0].className === "nested"
      ) {
        e.target.parentElement.nextSibling.children[0].className = "active";
      }
    }
    if (e.target.parentElement.nextElementSibling.children[0].lastChild) {
      e.target.parentElement.nextElementSibling.children[0].lastChild.style = {};
    }
  }

  //TODO: 이러지말고 각 deck에 willReceiveNewDeck 이런 속성을 만들면 될 거같은데? refactoring 필요할듯.
  handleDeckCategoryToggle(e) {
    //참고: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_treeview
    console.log(e.target);
    if (e.target.className === "caret" || e.target.className === "caret-down") {
      if (e.target.className === "caret") {
        e.target.className = "caret-down";
      } else if (e.target.className === "caret-down") {
        e.target.className = "caret";
      }
      //console.log(e.target.parentElement.children[2].children[0]);
      if (e.target.children[2].children[0].className === "nested") {
        e.target.children[2].children[0].className = "active";
      } else if (e.target.children[2].children[0].className === "active") {
        e.target.children[2].children[0].className = "nested";
      } else {
      }
    } else {
      return;
    }
  }

  componentDidMount() {
    this.props.updateUserDecks(/*this.props.userId*/);
  }

  render() {
    const { userId, /*decks,*/ category } = this.props;
    //console.log(category);
    //console.log(this.state.category);
    //console.log("userId: " + userId);
    //console.log(this.props.action);

    // const cateId = category.map((cate) => cate.id);
    // console.log("cateId:", cateId);
    //? deck.category => cate.category
    return (
      <div className="deck-list" /*ref={this.rootRef}*/>
        {category.map((cate, i) => {
          console.log(cate);
          return (
            <ul
              id={cate.category}
              className="caret"
              onClick={(e) => {
                this.handleDeckCategoryToggle(e);
              }}
            >
              <input
                className="category"
                type="text"
                disabled={false}
                // disabled={cate.Decks[j].isEditing ? false : true}
                value={cate.category}
                onChange={(e) => {
                  this.setState({ category: e.target.value });
                  cate.category = e.target.value;
                  this.props.editCateTitle(cate.id);
                  //this.props.editCategory(cate.category, e.target.value);
                }}
                onBlur={(e) => {
                  //마우스가 input 필드가 아닌 다른 곳을 클릭할 때 수정이 끝난 것으로 간주
                  this.setState({ category: e.target.value });
                  this.props.editCateInServer(cate.id, e.target.value);
                  this.props.editCateTitle(cate.id);
                  this.props.updateUserDecks();
                  //? this.props.disactivateDeckInput(i, j);
                }}
                onKeyUp={function (e) {
                  //엔터 쳤을때도 마찬가지로 수정 종료된 것으로 간주
                  if (e.keyCode === 13) {
                    this.props.editCateInServer(cate.id, e.target.value);
                    this.props.editCateTitle(cate.id);
                    this.props.updateUserDecks();
                    //? this.props.disactivateDeckInput(i, j);
                  }
                }.bind(this)}
              ></input>
              <span className="category-tool">
                <Tooltip title="add deck" placement="left">
                  <AddIcon
                    //TODO: 도움말 추가
                    // label="add Deck"

                    onClick={this.handleAddDeckButtonClick.bind(this)}
                  />
                </Tooltip>
                {/* <EditIcon
                  //? 꼭 필요한지 잘 모르겠음...
                  onClick={() => {
                    this.props.editCateInServer(cate.id, cate.category);
                    this.props.editCateTitle(cate.id);
                  }}
                /> */}
                <Tooltip title="delete category" placement="right">
                  <DeleteIcon
                    onClick={function () {
                      this.props.deleteCategory(cate.id);
                      //TODO: 카테고리가 지워질 경우, 덱도 전부 지워집니다. Y/N 경고 창이 필요
                      alert("delete all?");
                      this.props.updateUserDecks();
                      // let newCategory = [...this.state.category];
                      // newCategory[i].category = "";
                      // this.setState({ category: newCategory });
                      // this.setState({ category: this.props.category });
                    }.bind(this)}
                  />
                </Tooltip>
              </span>
              <li>
                <ul className="nested">
                  {cate.Decks
                    ? cate.Decks.map((singleDeck, j) => {
                        //console.log(singleDeck.id);
                        //console.log(cate.Decks);
                        //console.log(singleDeck);
                        return singleDeck["user_id"] === userId ? (
                          <li id={`${cate.category} ${singleDeck.title}`}>
                            <div>
                              <Link
                                to={
                                  cate.Decks[j].isEditing
                                    ? "/decks"
                                    : `/deck/${cate.category}/${singleDeck.title}`
                                }
                              >
                                <input
                                  type="text"
                                  className="deck-title"
                                  disabled={
                                    cate.Decks[j].isEditing ? false : true
                                  }
                                  value={singleDeck.title}
                                  onBlur={(e) => {
                                    //마우스가 input 필드가 아닌 다른 곳을 클릭할 때 수정이 끝난 것으로 간주
                                    console.log("no longer editing");
                                    this.props.editDeckInServer(
                                      singleDeck.id,
                                      e.target.value
                                    );
                                    this.props.disactivateDeckInput(i, j);
                                  }}
                                  onKeyUp={function (e) {
                                    //엔터 쳤을때도 마찬가지로 수정 종료된 것으로 간주
                                    if (e.keyCode === 13) {
                                      // console.log(singleDeck.id);
                                      this.props.editDeckInServer(
                                        singleDeck.id,
                                        e.target.value
                                      );
                                      this.props.disactivateDeckInput(i, j);
                                      // this.props.updateUserDecks();
                                    }
                                    // this.props.disactivateDeckInput(i, j);
                                  }.bind(this)}
                                  //!수정사항이 redux state에 반영 되는데
                                  //! console 찍어보면 isEditing이 계속 false로 나온다..
                                  onChange={(e) => {
                                    // let newDecks = [...this.state.category];
                                    // newDecks[i].Decks[j].title = e.target.value;
                                    this.props.editDeckTitle(
                                      i,
                                      j,
                                      e.target.value
                                    );
                                  }}
                                ></input>
                              </Link>
                              <span className="deck-tool">
                                <Tooltip title="edit deck" placement="left">
                                  <EditIcon
                                    onClick={() => {
                                      this.props.activateDeckInput(i, j);
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip title="delete deck" placement="right">
                                  <DeleteIcon
                                    onClick={() => {
                                      this.props.deleteDeck(
                                        cate.category,
                                        singleDeck.id
                                      );
                                      this.props.updateUserDecks();
                                    }}
                                  />
                                </Tooltip>
                              </span>
                            </div>
                          </li>
                        ) : null;
                      })
                    : null}
                  <input
                    style={{ display: "none" }}
                    className="newDeckInput"
                    type="text"
                    onBlur={function (e) {
                      if (e.keyCode === 13) {
                        if (e.target.value.length) {
                          this.props.addDeck(
                            /* userId, cateId, newDeckTitle */
                            userId,
                            cate.id,
                            e.target.value
                          );
                          this.props.updateUserDecks();
                        }
                        e.target.value = "";
                      }
                    }.bind(this)}
                    onKeyUp={function (e) {
                      if (e.keyCode === 13) {
                        if (e.target.value.length) {
                          this.props.addDeck(
                            /* userId, cateId, newDeckTitle */
                            userId,
                            cate.id,
                            e.target.value
                          );
                          this.props.updateUserDecks();
                        }
                        e.target.value = "";
                      }
                      //this.props.updateUserDecks();
                    }.bind(this)}
                  />
                </ul>
              </li>
            </ul>
          );
          // }.bind(this)
        })}
        {this.props.action === "add_category" ? (
          <ul className="caret-down">
            <input
              ref={this.newCategory}
              defaultValue="add new category"
              //id="newCategoryInput"
              // value={category}
              style={{ border: "3px black solid" }}
              type="text"
              onFocus={(e) => {
                e.target.value = "";
              }}
              // onChange={{}}
              onBlur={function (e) {
                if (e.target.value.length) {
                  //* this.props.addCategory(this.newCategory.current.value);
                  console.log(this.newCategory.current.value);
                  // this.props.addCategory(userId, e.target.value);
                  this.props.addCategory(
                    userId,
                    this.newCategory.current.value
                  );
                  this.props.updateUserDecks();
                }
              }.bind(this)}
              onKeyUp={function (e) {
                if (e.keyCode === 13) {
                  if (e.target.value.length) {
                    //* this.props.addCategory(this.newCategory.current.value);
                    // this.props.addCategory(userId, e.target.value);
                    this.props.addCategory(
                      userId,
                      this.newCategory.current.value
                    );
                    this.props.updateUserDecks();
                  }
                }
              }.bind(this)}
            ></input>
            {/*
            //* 카테고리를 추가한 후, (+) 버튼을 눌러서 덱을 추가하는 방식으로 바뀜
            <li>
              <input
                defaultValue="add first deck to category"
                style={{ border: "3px black solid" }}
                onFocus={(e) => {
                  e.target.value = "";
                }}
                //마우스가 input 필드가 아닌 다른 곳을 클릭하거나 엔터 치면 카테고리 및 덱 추가작업이 끝난 것으로 간주
                onBlur={function (e) {
                  if (e.target.value.length) {
                    //* this.props.addDeck(userId, this.newCategory.current.value,e.target.value);
                    this.props.addDeck(userId, cateId, e.target.value);
                    this.props.updateUserDecks();
                  }
                }.bind(this)}
                onKeyUp={function (e) {
                  if (e.keyCode === 13) {
                    if (e.target.value.length) {
                      //* this.props.addDeck(userId,this.newCategory.current.value,e.target.value);
                      this.props.addDeck(userId, cateId, e.target.value);
                      this.props.updateUserDecks();
                    }
                  }
                }.bind(this)}
              ></input>
            </li>
              */}
          </ul>
        ) : null}
        <OpenIconSpeedDial
          action={this.props.action}
          actions={this.state.speedDialActions}
        />
      </div>
    );
  }
}
