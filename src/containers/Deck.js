import Card from "../components/Card";
import { connect } from "react-redux";
import {
  // addCard,
  getDeckCards,
  editCard,
  editCardtype,
  editQuestion,
  editAnswer,
  editHint,
  editCardInServer,
  deleteCard,
} from "../actions/cardActions";
import { updateUserDecks } from "../actions/allDeckListActions";

//! Deck이 아닌 Card로 props 내려준다.
//? Deck => Card로 파일 이름 수정?
function mapStateToProps(state) {
  return {
    cards: state.card.cards,
    action: state.card.action,
    decks: state.deck.decks,
    category: state.deck.category,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserDecks: (userId) => {
      dispatch(updateUserDecks(userId));
    },
    getDeckCards: () /*card*/ => {
      dispatch(getDeckCards(/*card*/));
    },
    //addCard: card => {
    //  dispatch(addCard(card));
    //}, -> containers/addCard.js 로 이동
    editCard: (cardId) => {
      dispatch(editCard(cardId));
    },
    editCardtype: (originType, currentType) => {
      dispatch(editCardtype(originType, currentType));
    },
    editQuestion: (originQ, currentQ) => {
      dispatch(editQuestion(originQ, currentQ));
    },
    editAnswer: (originA, currentA) => {
      dispatch(editAnswer(originA, currentA));
    },
    editHint: (originH, currentH) => {
      dispatch(editHint(originH, currentH));
    },
    editCardInServer: (
      cardId,
      cardtype,
      question,
      answer,
      answer_target,
      hint
    ) => {
      dispatch(
        editCardInServer(
          cardId,
          cardtype,
          question,
          answer,
          answer_target,
          hint
        )
      );
    },
    deleteCard: (card) => {
      dispatch(deleteCard(card));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
