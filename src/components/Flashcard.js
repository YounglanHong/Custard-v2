import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FlareIcon from "@material-ui/icons/Flare";

import "../styles/Flashcard.css";

//TODO: 별표 아이콘 -> 누르면 card.marked = true

export default class Flashcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false,
      showHint: false,
      correctClicked: false,
      wrongClicked: false,
      doubleSubmit: false,
    };
    this.showHint = this.showHint.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.doubleSubmitCheck = this.doubleSubmitCheck.bind(this);
  }

  showHint() {
    this.setState({ showHint: true });
  }

  showAnswer() {
    this.setState({ showAnswer: true });
  }
  //* correct, wrong click된 상태에 따라 wrong, correct disable
  handleCorrect() {
    this.setState({ correctClicked: true });
  }

  handleWrong() {
    this.setState({ wrongClicked: true });
  }
  //* correct, wrong 중복 클릭 방지
  doubleSubmitCheck() {
    if (this.state.doubleSubmit) {
      return this.state.doubleSubmit;
    } else {
      this.setState({ doubleSubmit: true });
      return false;
    }
  }
  //* correct, wrong 클릭 이벤트
  handleCorrectClick() {
    if (this.doubleSubmitCheck()) {
      alert("already clicked");
    } else {
      this.props.handleCorrectAnswer(this.props.cardId);
      this.props.handleCorrectInServer(this.props.cardId);
      this.props.handleCorrectScore(this.props.cardId);
      this.handleCorrect();
    }
  }
  handleWrongClick() {
    if (this.doubleSubmitCheck()) {
      alert("already clicked");
    } else {
      this.props.handleWrongAnswer(this.props.cardId);
      this.props.handleWrongInServer(this.props.cardId);
      this.props.handleWrongScore(this.props.cardId);
      this.handleWrong();
    }
  }

  render() {
    const { cards, cardId } = this.props;
    return (
      <div id="flashcard">
        <Grid container spacing={1} className="flashcard_container">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            justify="center"
            alignItems="center"
            className="flashcard_content"
          >
            <Card variant="outlined">
              <CardHeader
                /*title="Flashcard"*/ subheader="Flashcard"
                className="flashcard_header"
              />
              {cards.map((card) => {
                return card.id === cardId ? (
                  <div>
                    <CardContent style={{ backgroundColor: "#faf9f2" }}>
                      {/* <CardActions> */}
                      <div>
                        <Tooltip title="hint" placement="right">
                          <FlareIcon
                            className="show_hint"
                            style={{ float: "right" }}
                            onClick={() => {
                              this.showHint();
                              this.props.handleHintedInServer(cardId);
                              this.props.handleHintedPost(cardId);
                              this.props.getDeckCards();
                            }}
                          >
                            show hint
                          </FlareIcon>
                        </Tooltip>
                      </div>
                      <br></br>
                      <CardContent>
                        <div className="flashcard_Q">
                          <div style={{ fontWeight: "bold" }}>
                            <br></br>Question
                          </div>
                          {card.question}
                        </div>
                        <br></br>
                        {this.state.showHint === true ? (
                          <div className="flashcard_H">
                            <div style={{ fontWeight: "bold" }}>
                              <br></br>Hint
                            </div>
                            {card.hint}
                          </div>
                        ) : null}
                        <br></br>
                        {this.state.showAnswer === true ? (
                          <div className="flashcard_A">
                            <div style={{ fontWeight: "bold" }}>
                              <br></br>Answer
                            </div>
                            {card.answer}
                          </div>
                        ) : null}
                      </CardContent>
                      <br></br>
                      {/* </CardActions> */}
                    </CardContent>
                    {this.state.showAnswer === true ? (
                      <div>
                        <CardActions>
                          {this.state.wrongClicked === false ? (
                            <Button
                              className="flashcard_button"
                              variant="contained"
                              color="default"
                              onClick={function () {
                                this.handleCorrectClick();
                              }.bind(this)}
                            >
                              okay
                            </Button>
                          ) : (
                            <Button
                              //disabled="true"
                              variant="contained"
                              disabled
                              className="flashcard_button"
                            >
                              okay
                            </Button>
                          )}
                          {this.state.correctClicked === false ? (
                            <Button
                              className="flashcard_button"
                              variant="contained"
                              color="default"
                              onClick={function () {
                                this.handleWrongClick();
                              }.bind(this)}
                            >
                              wrong
                            </Button>
                          ) : (
                            <Button
                              //disabled="true"
                              variant="contained"
                              disabled
                              className="flashcard_button"
                            >
                              wrong
                            </Button>
                          )}
                        </CardActions>
                      </div>
                    ) : (
                      <Button
                        onClick={this.showAnswer}
                        variant="contained"
                        color="default"
                        fullWidth
                        className="flash_answer_button"
                      >
                        show answer
                      </Button>
                    )}
                  </div>
                ) : null;
              })}
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
