import Score from "../components/Score";
import { connect } from "react-redux";

import {
  getDeckCards,
  handleCorrectAnswer,
  handleWrongAnswer,
  handleHintedPost,
} from "../actions/cardActions";

function mapStateToProps(state) {
  return {
    cards: state.card.cards,
    decks: state.deck.decks,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDeckCards: () => {
      dispatch(getDeckCards());
    },
    handleCorrectAnswer: (cardId) => {
      dispatch(handleCorrectAnswer(cardId));
    },
    handleWrongAnswer: (cardId) => {
      dispatch(handleWrongAnswer(cardId));
    },
    handleHintedPost: (cardId) => {
      dispatch(handleHintedPost(cardId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Score);
