import { ADD_CARD, SHOW_CARD } from "../actions/cardActions.js";
import {
  EDIT_CARD,
  DELETE_CARD,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  // HINTED_SCORE
} from "../actions/cardActions.js";
// import { formatTimestamp } from "../actions/allDeckListActions.js";

const initialState = {
  cards: [
    {
      id: 1, //! deleteCard 기능 위한 임시 id(DB에서 데이터를 받아올 때는 미포함)
      question: "죽음의 크리스탈은 왜 훔쳤어? -오래 살고 싶어서요.",
      answer: "why would you steal a death crystal? - {{1I want to die old!}}",
      note: "", //hint에 해당
      cardtype: "fill-in-the-blank",
      category: "English", //! DB에서 데이터를 받아올 때는 미포함
      title: "Netflix - Rick and Morty", //! DB에서 데이터를 받아올 때는 미포함
      answer_target: [
        "why would you steal a death crystal? - I want to die old!",
      ],
      covered: 0,
      created_at: "2020-03-05",
      last_studied: "2020-03-12",
      correct: 0,
      wrong: 0,
      hinted: 0,
      marked: false,
    },

    {
      id: 2, //! deleteCard 기능 위한 임시 id(DB에서 데이터를 받아올 때는 미포함)
      question: "사진 완전 잘나왔다. 슬퍼하니까 얼굴에서 광이 나네.",
      answer:
        " - It is a hot photo. I think {{1grief}} {{2flushes}} her {{3cheeks}}.",
      note: "summer's line",
      cardtype: "fill-in-the-blank", //? flashcard
      category: "English", //! DB에서 데이터를 받아올 때는 미포함
      title: "Netflix - Rick and Morty", //! DB에서 데이터를 받아올 때는 미포함
      answer_target: ["grief", "flushes", "cheeks"],
      covered: 0,
      created_at: "2020-03-05",
      last_studied: "2020-03-12",
      correct: 0,
      wrong: 0,
      hinted: 0,
      marked: false,
    },
    {
      id: 3, //! deleteCard 기능 위한 임시 id(DB에서 데이터를 받아올 때는 미포함)
      question: "인사과",
      answer: "human resources",
      note: "Hacker Voca 2500",
      cardtype: "flashcard",
      category: "English", //! DB에서 데이터를 받아올 때는 미포함
      title: "TOEIC", //! DB에서 데이터를 받아올 때는 미포함
      answer_target: ["human resources"], //!null?
      covered: 0,
      created_at: "2020-03-05",
      last_studied: "2020-03-12",
      correct: 0,
      wrong: 0,
      hinted: 0,
      marked: false,
    },
    {
      id: 4, //! deleteCard 기능 위한 임시 id(DB에서 데이터를 받아올 때는 미포함)
      question: "분산시키다",
      answer: "disperse",
      note: "Hacker Voca 2500",
      cardtype: "flashcard",
      category: "English", //! DB에서 데이터를 받아올 때는 미포함
      title: "TOEIC", //! DB에서 데이터를 받아올 때는 미포함
      answer_target: null,
      covered: 0,
      created_at: "2020-03-05",
      last_studied: "2020-03-12",
      correct: 0,
      wrong: 0,
      hinted: 0,
      marked: false,
    },
    {
      id: 5, //! deleteCard 기능 위한 임시 id(DB에서 데이터를 받아올 때는 미포함)
      question: "수줍어하는",
      answer: "coy",
      note: "rick and morty s2e6", //hint에 해당
      cardtype: "flashcard",
      category: "English", //! DB에서 데이터를 받아올 때는 미포함
      title: "Netflix - Rick and Morty", //! DB에서 데이터를 받아올 때는 미포함
      answer_target: ["coy"], //null?
      covered: 0,
      created_at: "2020-03-05",
      last_studied: "2020-03-12",
      correct: 0,
      wrong: 0,
      hinted: 0,
      marked: false,
    },
  ],
};

//* 액션을 만들어 발생시키면 리듀서가 현재 상태와 전달 받은 액션 객체를 파라미터로 받아온다.
//* 두 값을 참고하여 새로운 상태를 만들어 반환해 준다.

//*
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CARD:
      return Object.assign({}, state, { cards: action.cards });
    case ADD_CARD:
      const cardAddState = [...state.cards];
      for (let i = 0; i < action.newCardArr.length; i++) {
        action.newCardArr[i].id = state.cards.length + 1; //사실 id는 서버에서 줘야
        cardAddState.push(action.newCardArr[i]);
      }
      console.log(cardAddState);
      return Object.assign({}, state, { cards: cardAddState });
    case EDIT_CARD: //TODO: question, answer, answer_target, cardtype 수정
      // const cardEditState = [...state.cards];
      // console.log(cardEditState);
      return Object.assign({}, state, { action: "editCard" });
    case DELETE_CARD:
      const deleteCard = [];
      for (let i = 0; i < state.cards.length; i++) {
        if (state.cards[i].id !== action.id) {
          deleteCard.push(state.cards[i]);
        }
      }
      return Object.assign({}, state, { cards: deleteCard });
    case CORRECT_ANSWER:
      console.log("reducer: correct!");
      console.log(action.cardId);
      console.log(typeof action.cardId);
      const correctCardState = [...state.cards];
      for (let i = 0; i < correctCardState.length; i++) {
        if (correctCardState[i].id === action.cardId) {
          correctCardState[i].correct++;
        }
      }
      console.log(correctCardState);
      return Object.assign({}, state, { cards: correctCardState });
    case WRONG_ANSWER:
      const wrongCardState = [...state.cards];
      for (let i = 0; i < wrongCardState.length; i++) {
        if (wrongCardState[i].id === action.cardId) {
          wrongCardState[i].wrong++;
        }
      }
      console.log(wrongCardState);
      return Object.assign({}, state, { cards: wrongCardState });
    // case HINTED_SCORE:
    //   console.log("reducer: correct!");
    //   console.log(action.cardId);
    //   // console.log(typeof action.cardId);
    //   const hintedCardState = [...state.cards];
    //   for (let i = 0; i < hintedCardState.length; i++) {
    //     if (hintedCardState[i].id === action.cardId) {
    //       hintedCardState[i].hinted++;
    //     }
    //   }
    //   console.log(hintedCardState);
    //   return Object.assign({}, state, { cards: hintedCardState });
    default:
      return state;
  }
};

export default reducer;
