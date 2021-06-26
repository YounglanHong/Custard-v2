import Study from "../components/Study";
import { connect } from "react-redux";

import { updateUserDecks } from "../actions/allDeckListActions";

import {
  handleCorrectAnswer,
  handleCorrectInServer,
  handleCorrectScore,
  handleWrongAnswer,
  handleWrongInServer,
  handleWrongScore,
  getDeckCards,
  handleMarkedInServer,
  handleMarkedPost,
  handleHintedInServer,
  handleHintedPost,
} from "../actions/cardActions";

//TODO: 얘 파일명 AddCardContainer로 바꾸는거 안되는지 시도해보길 바람

const mapStateToProps = (state) => {
  return {
    decks: state.deck.decks,
    cards: state.card.cards,
    category: state.deck.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDecks: (userId) => {
      dispatch(updateUserDecks(userId));
    },
    getDeckCards: () => {
      dispatch(getDeckCards());
    },
    handleCorrectAnswer: (cardId) => {
      dispatch(handleCorrectAnswer(cardId));
    },
    handleCorrectInServer: (cardId) => {
      dispatch(handleCorrectInServer(cardId));
    },
    handleCorrectScore: (cardId) => {
      dispatch(handleCorrectScore(cardId));
    },
    handleWrongAnswer: (cardId) => {
      dispatch(handleWrongAnswer(cardId));
    },
    handleWrongInServer: (cardId) => {
      dispatch(handleWrongInServer(cardId));
    },
    handleWrongScore: (cardId) => {
      dispatch(handleWrongScore(cardId));
    },
    handleMarkedInServer: (cardId) => {
      dispatch(handleMarkedInServer(cardId));
    },
    handleMarkedPost: (cardId) => {
      dispatch(handleMarkedPost(cardId));
    },
    handleHintedInServer: (cardId) => {
      dispatch(handleHintedInServer(cardId));
    },
    handleHintedPost: (cardId) => {
      dispatch(handleHintedPost(cardId));
    },
    // hintedInStore: cardId => {
    //   dispatch(hintedInStore(cardId));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Study);
