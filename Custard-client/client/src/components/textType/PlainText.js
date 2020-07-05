import React from "react";
import TextField from "@material-ui/core/TextField";

import AddCardType from "../selectMenu/AddCardType";

import "../../styles/PlainText.css";

export default class PlainText extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    //? AddCard > PlainText props
    //console.log(this.props);
    const {
      addCardForm,
      handleCardTypeChange,
      handleInputQuestion,
      handleInputAnswer,
      handleAnswerInputKeyUp,
      handleInputNote,
    } = this.props;

    return addCardForm.map((cardForm, i) => {
      return (
        <div className="add_card" key={i}>
          <AddCardType handleCardTypeChange={handleCardTypeChange} idx={i} />
          <div
            class="question-label-container"
            style={{ backgroundColor: "grey" }}
          >
            <span className="question-label">Question</span>
          </div>
          <TextField
            className="addQuestion"
            multiline
            rows="15"
            //placeholder="Question"
            value={addCardForm[i].question}
            onChange={(e) => {
              handleInputQuestion(i, e);
            }}
          />
          <div>
            Answer{" "}
            <span className="answer-count">
              글자수: {cardForm.answer.length} / 2500자
            </span>
          </div>
          <TextField
            className="addAnswer"
            multiline
            rows="15"
            placeholder="Press Ctrl + Shift + s to add blank"
            value={addCardForm[i].answer}
            onChange={(e) => {
              handleInputAnswer(i, e);
            }}
            onKeyUp={(e) => {
              handleAnswerInputKeyUp(i, e);
            }}
          />
          <div>Note</div>
          <TextField
            className="addNote"
            multiline
            rows="15"
            //placeholder="Hint"
            value={addCardForm[i].note}
            onChange={(e) => {
              handleInputNote(i, e);
            }}
          />
        </div>
      );
    });
  }
}
