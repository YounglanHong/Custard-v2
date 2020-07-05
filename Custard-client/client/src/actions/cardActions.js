import axios from "axios";

export const SHOW_CARD = "SHOW_CARD";
export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const CORRECT_ANSWER = "CORRECT_ANSWER";
export const WRONG_ANSWER = "WRONG_ANSWER";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const EDIT_ANSWER = "EDIT_ANSWER";
export const EDIT_HINT = "EDIT_HINT";
export const EDIT_CARDTYPE = "EDIT_CARDTYPE";
export const HINTED_SCORE = "HINTED_SCORE";

//TODO: 기능들이 실제로 화면에서 보여지도록 클라이언트 작업 필요
export function getDeckCards(/*card*/) {
  return dispatch => {
    axios
      .get("http://localhost:4000/card/cardInfo")
      .then(res => {
        //console.log(res.data);
        dispatch(showCard(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function showCard(cards) {
  return {
    type: SHOW_CARD,
    cards: cards
  };
}

export function addCard(/*cardType, */ category, deckId, validAddCardForm) {
  //answer에 있는 보기 싫은 {{ }} .replace()로 없애줘야!? -> study부분에서 해결해야할 문제
  const pattern = /\{.*?\}/g; //{{1corona virus}} 이 형태의 string을 골라내고 있음
  for (let i = 0; i < validAddCardForm.length; i++) {
    //validAddCardForm[i].cardType = cardType;
    validAddCardForm[i].category = category;
    validAddCardForm[i].deckId = deckId;
    console.log(validAddCardForm[i].answer);
    const answerTarget = validAddCardForm[i].answer.match(pattern);
    if (validAddCardForm[i].cardType === "fill-in-the-blank" && !answerTarget) {
      console.log("should have at least one blank");
      return;
      //TODO: fill-in-the-blank 타입의 카드에서는 최소 하나의 빈칸을 지정해야한다는 모달창 뜨도록 만들어야함
    } else if (
      validAddCardForm[i].cardType === "fill-in-the-blank" &&
      answerTarget
    ) {
      const answerTargetArr = [];
      for (let i = 0; i < answerTarget.length; i++) {
        if (!answerTargetArr[answerTarget[i][2] - 1]) {
          answerTargetArr.push(
            answerTarget[i].slice(3, answerTarget[i].length - 1)
          );
        } else {
          const str = answerTargetArr[answerTarget[i][2] - 1];
          answerTargetArr[answerTarget[i][2] - 1] = [
            str,
            answerTarget[i].slice(3, answerTarget[i].length - 1)
          ];
        }
      }
      validAddCardForm[i]["answer_target"] = answerTargetArr;
    } else if (validAddCardForm[i].cardType === "flashcard") {
      validAddCardForm[i]["answer_target"] = null;
    }
    //validAddCardForm[i].cardType = validAddCardForm[i].cardType;
    validAddCardForm[i].covered = 0;
    validAddCardForm[i]["created_at"] = new Date(); //!format?
    validAddCardForm[i]["last_studied"] = null;
    validAddCardForm[i].correct = 0;
    validAddCardForm[i].wrong = 0;
    validAddCardForm[i].hinted = 0;
    validAddCardForm[i].marked = false;
  }
  console.log(validAddCardForm);
  const promises = validAddCardForm.map(cardForm =>
    axios
      .post("http://localhost:4000/card/cardInfo", {
        deck_id: cardForm.deckId,
        cardtype: cardForm.cardType,
        question: cardForm.question,
        answer: cardForm.answer,
        answer_target: String(cardForm["answer_target"]),
        hint: cardForm.note
      })
      .then(({ data }) => data)
  );
  return dispatch => {
    Promise.all(promises)
      .then(res => {
        console.log(res);
        dispatch(addCardToStore(validAddCardForm));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

export function addCardToStore(validAddCardForm) {
  return {
    type: ADD_CARD,
    newCardArr: validAddCardForm
  };
}

//****************** editCard  *************************/
//* 서버의 카드 cardtype, question, answer, hint 수정
export function editCardInServer(
  cardId,
  cardtype,
  question,
  answer,
  answer_target,
  hint
) {
  // return dispatch => {
  return dispatch => {
    axios
      .patch("http://localhost:4000/card/up-card ", {
        // data: {
        id: cardId,
        cardtype: cardtype,
        question: question,
        answer: answer,
        answer_target: answer_target,
        hint: hint
        // }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

//* 수정한 카드의 cardtype, question, answer, hint 불러옴
export function editCard(cardId) {
  return dispatch => {
    axios
      .post("http://localhost:4000/card/up-card", {
        id: cardId
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch(editCardInStore(res.data));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
export function editCardInStore(id) {
  return {
    type: EDIT_CARD,
    id: id
  };
}

//***** Card 컴포넌트의 cardtype, Q, A, H state 관리 *********/
export function editCardtype(originType, currentType) {
  return {
    type: EDIT_CARDTYPE,
    originType: originType,
    currentType: currentType
  };
}
export function editQuestion(originQ, currentQ) {
  return {
    type: EDIT_QUESTION,
    originQ: originQ,
    currentQ: currentQ
  };
}
export function editAnswer(originA, currentA) {
  console.log(originA);
  console.log(currentA);
  return {
    type: EDIT_ANSWER,
    originA: originA,
    currentA: currentA
  };
}
export function editHint(originH, currentH) {
  return {
    type: EDIT_HINT,
    originH: originH,
    currentH: currentH
  };
}

//****************** deleteCard ***********************/
export function deleteCard(cardId) {
  console.log("trying to delete cardin db");
  console.log(cardId);
  console.log(typeof cardId);
  return dispatch => {
    axios
      .delete("http://localhost:4000/card/up-card ", {
        data: { id: cardId }
      })
      .then(res => {
        console.log(res);
        dispatch(deleteCardInStore(cardId));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

export function deleteCardInStore(id) {
  console.log(id);
  console.log("delete card action");
  return {
    type: DELETE_CARD,
    id: id
  };
}

//*********** Correct & Wrong *******************/
export function handleCorrectAnswer(cardId) {
  console.log("correct!");
  console.log(cardId);
  console.log(typeof cardId);
  return {
    type: CORRECT_ANSWER,
    cardId: cardId
  };
}
export function handleCorrectInServer(cardId) {
  console.log(cardId);
  return dispatch => {
    axios
      .patch("http://localhost:4000/card/correct", {
        id: cardId
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
export function handleCorrectScore(cardId) {
  console.log(cardId);
  return dispatch => {
    axios
      .post("http://localhost:4000/card/correct", {
        id: cardId
      })
      .then(res => {
        console.log(res);
        // dispatch(correctCardInStore(cardId));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
// export function correctCardInStore(cardId) {
//   return {
//     type: CORRECT_SCORE,
//     id: cardId
//   };
// }

export function handleWrongAnswer(cardId) {
  return {
    type: WRONG_ANSWER,
    cardId: cardId
  };
}
export function handleWrongInServer(cardId) {
  console.log(cardId);
  return dispatch => {
    axios
      .patch("http://localhost:4000/card/wrong", {
        id: cardId
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
export function handleWrongScore(cardId) {
  console.log(cardId);
  return dispatch => {
    axios
      .post("http://localhost:4000/card/wrong", {
        id: cardId
      })
      .then(res => {
        console.log(res);
        // dispatch(wrongCardInStore(cardId));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
// export function wrongCardInStore(cardId) {
//   return {
//     type: WRONG_SCORE,
//     id: cardId
//   };
// }
//*********** Marked & Hinted *******************/
export function handleMarkedInServer(cardId) {
  console.log(cardId);
  return dispatch => {
    axios
      .patch("http://localhost:4000/card/marked", {
        id: cardId
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
export function handleMarkedPost(cardId) {
  console.log(cardId);
  return dispatch => {
    axios
      .post("http://localhost:4000/card/marked", {
        id: cardId
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

export function handleHintedInServer(cardId) {
  console.log(cardId);
  return dispatch => {
    axios
      .patch("http://localhost:4000/card/hinted", {
        id: cardId
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
export function handleHintedPost(cardId) {
  console.log(cardId);
  return dispatch => {
    axios
      .post("http://localhost:4000/card/hinted", {
        id: cardId
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

// export function hintedInStore(cardId) {
//   return {
//     type: HINTED_SCORE,
//     id: cardId
//   };
// }
