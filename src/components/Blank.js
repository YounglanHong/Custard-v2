import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import JsxParser from "react-jsx-parser";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FlareIcon from "@material-ui/icons/Flare";

import "../styles/Blank.css";

class Answer extends Component {
  render() {
    return <span></span>;
  }
}

export default class Blank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHint: false,
      showAnswer: false,
      submittedAnswerArr: [],
      blankCount: 0,
      correctClicked: false,
      wrongClicked: false,
      doubleSubmit: false,
    };
    this.answerSubmitForm = React.createRef();
    this.showHint = this.showHint.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
    this.doubleSubmitCheck = this.doubleSubmitCheck.bind(this);
  }

  showHint() {
    this.setState({ showHint: true });
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

  keyGenerator() {
    this.setState({ blankCount: this.state.blankCount + 1 });
    console.log(this.state.blankCount);
    return this.state.blankCount;
  }

  handleAnswerSubmit(e) {
    if (e.keyCode === 13) {
      const newSubmittedAnswerArr = [];
      console.log("submitted");
      console.log(this.answerSubmitForm.current.children);
      for (
        let i = 0;
        i < this.answerSubmitForm.current.children[1].children.length;
        i++
      ) {
        newSubmittedAnswerArr.push(
          this.answerSubmitForm.current.children[1].children[i].value
        );
        this.answerSubmitForm.current.children[1].children[i].disabled = true;
      }
      console.log(this.props.cardId);
      for (let i = 0; i < this.props.cards.length; i++) {
        if (this.props.cards[i].id === this.props.cardId) {
          console.log("correct answer: ");
          console.log(this.props.cards[i]["answer_target"]);
        }
      }
      console.log("submitted: ");
      console.log(newSubmittedAnswerArr);
      this.setState({
        showAnswer: true,
        submittedAnswerArr: newSubmittedAnswerArr,
      });
    }
  }

  render() {
    console.log(this.props);
    const { cards, cardId } = this.props;
    console.log(cardId);
    console.log(typeof cardId);
    return (
      <div id="blank">
        <Grid container spacing={1} className="blank_container">
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
              <CardHeader subheader="Blank" className="blank_header" />
              <CardContent style={{ backgroundColor: "#faf9f2" }}>
                <Tooltip title="hint" placement="right">
                  <FlareIcon
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
                <br></br>
                {cards.map((card) => {
                  // let n = 0;
                  let answer = card.answer.replace(
                    /{{[0-99999]/g,
                    "<span style={answerStyle}>"
                  );
                  answer = answer.replace(/}}/g, "</span>");
                  const splitAnswerArr = card.answer
                    .split(/{|}/)
                    .map(function (answer, i) {
                      if (parseInt(answer[0])) {
                        return `<input key=${i} style="border: 3px black solid"></input>`;
                      }
                      return answer;
                    })
                    .join("");
                  return card.id === cardId ? (
                    <div
                      ref={this.answerSubmitForm}
                      onKeyUp={this.handleAnswerSubmit}
                    >
                      <div>
                        <h4>Question</h4>
                        <div>{card.question}</div>
                      </div>
                      <br></br>
                      {this.state.showHint && card.hint ? (
                        <div>
                          <h4>Hint</h4>
                          <div>{card.hint}</div>
                        </div>
                      ) : null}
                      <br></br>
                      {this.state.showAnswer ? (
                        <JsxParser
                          bindings={{
                            answerStyle: {
                              borderRadius: 3,
                              backgroundColor: "#ffef96",
                            },
                          }}
                          components={{ Answer }}
                          jsx={answer}
                        />
                      ) : null}
                      <h4>Answer</h4>
                      <div>{ReactHtmlParser(splitAnswerArr)}</div>
                      <br></br>
                    </div>
                  ) : null;
                })}
              </CardContent>
              {this.state.showAnswer === true ? (
                <div>
                  <CardActions>
                    {this.state.wrongClicked === false ? (
                      <Button
                        className="blank_button"
                        variant="contained"
                        color="default"
                        onClick={function () {
                          this.handleCorrectClick();
                        }.bind(this)}
                      >
                        okay
                      </Button>
                    ) : (
                      <Button className="blank_button" disabled={true}>
                        okay
                      </Button>
                    )}
                    {this.state.correctClicked === false ? (
                      <Button
                        className="blank_button"
                        variant="contained"
                        color="default"
                        onClick={function () {
                          this.handleWrongClick();
                        }.bind(this)}
                      >
                        wrong
                      </Button>
                    ) : (
                      <Button className="blank_button" disabled={true}>
                        wrong
                      </Button>
                    )}
                  </CardActions>
                </div>
              ) : null}
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
