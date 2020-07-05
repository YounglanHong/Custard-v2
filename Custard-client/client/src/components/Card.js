import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import DeckSpeedDial from "./speedDial/DeckSpeedDial";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardType from "./selectMenu/CardType";

import "../styles/Card.css";
import { brown } from "@material-ui/core/colors";

const styles = {
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // border: 0,
    // borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    // color: "white",
    // height: 48,
    // padding: "0 30px",
    // margin: "10px",
    flexGrow: 1,
  },
  paper: {
    height: 500,
    width: 500,
  },
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DeckSpeedDialActions: [
        {
          icon: <AddCircleIcon />,
          name: "Add Cards",
        },
      ],
      answerTargetCount: 1,
      isEditing: false,
      // anchorEl: null
    };
    this.handleAnswerInputKeyUp = this.handleAnswerInputKeyUp.bind(this);
  }

  handleCardType(cardType) {
    this.setState({ cardType: cardType });
  }

  //수정시에도 Ctrl + Shift + s 단축키 사용가능하도록 추가
  handleAnswerInputKeyUp(i, e) {
    console.log("key up");
    //if (e.ctrlKey && e.shiftKey && e.which == 83) {
    console.log("Ctrl + Shift + s clicked");
    const wholeText = e.target.value;
    const selectedText = document.getSelection().toString();
    console.log(selectedText);
    const count = this.state.answerTargetCount;
    const markedUpText =
      wholeText.slice(0, wholeText.indexOf(selectedText)) +
      "{{" +
      count +
      selectedText +
      "}}" +
      wholeText.slice(wholeText.indexOf(selectedText) + selectedText.length);

    console.log(markedUpText);
    e.target.value = markedUpText;
    //}
  }

  componentDidMount() {
    //TODO:
    this.props.updateUserDecks(/*this.props.userId*/);
    this.props.getDeckCards();
  }

  handleEditing() {
    this.setState({ isEditing: true });
  }
  handleStopEditing() {
    this.setState({ isEditing: false });
  }

  render() {
    // const { classes } = this.props;
    const { cards } = this.props;
    //? category => cate_route
    const { cate_route, title } = this.props.match.params;
    //const { decks } = this.props;
    const { category } = this.props;
    console.log(this.props.category);
    console.log("category", category);
    console.log("cards:", cards);
    console.log(this.props.editCardtype);
    // const { history } = this.props;
    // console.log(cards);
    // console.log(decks);

    let currentDeckId = 0;
    for (let i = 0; i < category.length; i++) {
      for (let j = 0; j < category[i].Decks.length; j++) {
        if (category[i].Decks[j].title === title) {
          currentDeckId = category[i].Decks[j].id;
        }
      }
    }
    console.log(currentDeckId);
    //* FillInTheBlank 추가
    //? deck => cate
    return (
      <div id="card">
        <Grid container spacing={3} className="card_container">
          {category.map((cate) => {
            console.log(cate);
            return cate.Decks.map((childDeck) => {
              console.log(childDeck);
              const cardIdArr = [];
              cards.map((card) => {
                if (card["deck_id"] === currentDeckId) {
                  cardIdArr.push(card.id);
                }
                console.log(cardIdArr);
              });
              return cate.category === cate_route &&
              childDeck.id === currentDeckId && //? (
                childDeck.title === title ? ( //&&
                /*childDeck.id === card.deck_id*/
                //<div key={childDeck.title}>
                <Grid container spacing={0} className="card_header">
                  <Grid item xs={12} sm={12} md={12} className="card_title">
                    <h3>
                      {cate.category}: {childDeck.title}
                    </h3>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} className="card_study">
                    <Link
                      component={RouterLink}
                      //* to={`/study/${cate.category}/${childDeck.title}/${cardIdArr[0]}`}
                      to={`/study/${cate.category}/${childDeck.title}/${
                        cardIdArr[0] /*card.id*/
                      }`}
                    >
                      <Button id="card_study_button" /*variant="contained"*/>
                        Study
                      </Button>
                    </Link>
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={12}></Grid> */}
                </Grid>
              ) : //</div>
              null;
            });
          })}

          {cards.map((card, idx) => {
            // console.log(card);
            // if (card.cardtype === "fill-in-the-blank") {
            //   //fill-in-the-blank타입의 경우 {{n }}을 제거하고 렌더링
            //   card.answer = card.answer.replace(/{{[0-99999]/g, "");
            //   card.answer = card.answer.replace(/}}/g, "");
            // }
            return card["deck_id"] === currentDeckId ? (
              /*card.category === category && card.title === title*/ /* enableReinitialize: default is false. 
            Control whether Formik should reset the form if initialValues changes */
              <Formik
                key={card.id}
                initialValues={{
                  id: card.id,
                  cardtype: card.cardtype,
                  question: card.question,
                  answer: card.answer,
                  answer_target: card.answer_target,
                  hint: card.hint,
                }}
                enableReinitialize={false}
                onSubmit={(values, { setSubmitting }) => {
                  // alert(JSON.stringify(values, null, 2));
                  setSubmitting(true);
                }}
              >
                {({ values, isSubmitting, handleChange, handleSubmit }) => {
                  //* Formik에서는 values props로 state 관리
                  // console.log(values);
                  //TODO: Q, A 번호 덱 네 카드 번호로 정렬해야할듯
                  return (
                    <form onSubmit={handleSubmit}>
                      <Grid
                        container
                        spacing={1}
                        className="card_content"
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          className="card_cardtype"
                        >
                          <br />
                          <span>Card{idx + 1}</span>
                          <br />
                          <CardType
                            className="card_cardtype_button"
                            values={values}
                            handleCardType={this.handleCardType.bind(this)}
                            editCardtype={this.props.editCardtype.bind(this)}
                            editCardInServer={this.props.editCardInServer.bind(
                              this
                            )}
                            editCard={this.props.editCard.bind(this)}
                          />
                          <br />
                        </Grid>
                        <Grid xs={6} sm={6} md={6}>
                          <Button className="card_button">
                            <Tooltip title="delete card" placement="right">
                              <DeleteIcon
                                onClick={() => {
                                  console.log("delete card");
                                  this.props.deleteCard(card.id);
                                }}
                              />
                            </Tooltip>
                          </Button>
                          <Button type="submit" className="card_button">
                            {/* <Button type="submit" disabled={isSubmitting}> */}
                            <Tooltip title="edit card" placement="left">
                              <EditIcon
                                onClick={function () {
                                  this.handleEditing();
                                }.bind(this)}
                              />
                            </Tooltip>
                          </Button>
                        </Grid>
                      </Grid>
                      <div className="card_text_container">
                        <Grid container spacing={3} className="card_text">
                          <Grid item xs={12} sm={12} md={12}>
                            <br />
                            &nbsp;Question. {idx + 1}
                            <TextField
                              fullWidth
                              style={{
                                backgroundColor: "#fcfbe9",
                                borderRadius: "3px",
                                color: brown,
                              }}
                              name="question"
                              disabled={this.state.isEditing ? false : true}
                              type="text"
                              multiline
                              variant="outlined"
                              rows="5"
                              value={values.question}
                              onChange={(e) => {
                                handleChange(e);
                                values.question = e.target.value;
                                this.props.editQuestion(
                                  card.question,
                                  e.target.value
                                );
                              }}
                              onBlur={() => {
                                this.props.editCardInServer(
                                  values.id,
                                  values.cardtype,
                                  values.question,
                                  values.answer,
                                  values.answer_target,
                                  values.hint
                                );
                                this.props.editCard(values.id);
                                this.handleStopEditing();
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <br />
                            &nbsp;Answer. {idx + 1}
                            <TextField
                              fullWidth
                              style={{
                                backgroundColor: "#fcfbe9",
                                borderRadius: "3px",
                                color: brown,
                              }}
                              name="answer"
                              disabled={this.state.isEditing ? false : true}
                              type="text"
                              multiline
                              variant="outlined"
                              rows="5"
                              value={values.answer}
                              onChange={(e) => {
                                if (e.ctrlKey && e.shiftKey && e.which == 83) {
                                  this.handleAnswerInputKeyUp(idx, e);
                                }
                                handleChange(e);
                                values.answer = e.target.value;
                                this.props.editAnswer(
                                  card.answer,
                                  e.target.value
                                );
                              }}
                              onBlur={() => {
                                this.props.editCardInServer(
                                  values.id,
                                  values.cardtype,
                                  values.question,
                                  values.answer,
                                  values.answer_target,
                                  values.hint
                                );
                                this.props.editCard(values.id);
                                this.handleStopEditing();
                              }}
                              onKeyUp={(e) => {
                                if (e.ctrlKey && e.shiftKey && e.which == 83) {
                                  this.handleAnswerInputKeyUp(idx, e);
                                  handleChange(e);
                                  console.log(e.target.value);
                                  values.answer = e.target.value;
                                  this.props.editAnswer(
                                    card.answer,
                                    e.target.value
                                  );
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <br />
                            &nbsp;Hint. {idx + 1}
                            <TextField
                              fullWidth
                              style={{
                                backgroundColor: "#fcfbe9",
                                borderRadius: "3px",
                                color: brown,
                              }}
                              name="hint"
                              disabled={this.state.isEditing ? false : true}
                              type="text"
                              multiline
                              variant="outlined"
                              rows="5"
                              value={values.hint}
                              onChange={(e) => {
                                handleChange(e);
                                values.hint = e.target.value;
                                this.props.editAnswer(
                                  card.hint,
                                  e.target.value
                                );
                              }}
                              onBlur={() => {
                                this.props.editCardInServer(
                                  values.id,
                                  values.cardtype,
                                  values.question,
                                  values.answer,
                                  values.answer_target,
                                  values.hint
                                );
                                this.props.editCard(values.id);
                                this.handleStopEditing();
                              }}
                            />
                          </Grid>
                        </Grid>
                        <br />
                      </div>
                      <br />
                      {/* </Grid> */}
                      <br />
                    </form>
                  );
                }}
              </Formik>
            ) : null;
          })}
          <Grid container /*className="card_dial"*/>
            <Grid item xs={12} sm={12} md={12}>
              {category.map((cate) =>
                cate.Decks.map((childDeck) => {
                  const cardIdArr = [];
                  for (let i = 0; i < cards.length; i++) {
                    if (cards[i]["deck_id"] === currentDeckId)
                      cardIdArr.push(cards[i].id);
                  }
                  return cate.category === cate_route &&
                    childDeck.id === currentDeckId ? (
                    <Link
                      component={RouterLink}
                      to={`/addCard/${cate.category}/${childDeck.title}`}
                    >
                      <DeckSpeedDial
                        className="card_dial"
                        actions={this.state.DeckSpeedDialActions}
                      />
                    </Link>
                  ) : null;
                })
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Card);
