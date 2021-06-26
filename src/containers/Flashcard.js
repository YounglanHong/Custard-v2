import Flashcard from "../components/Flashcard";
import { connect } from "react-redux";
import { getDeckCards } from "../actions/cardActions";

function mapStateToProps(state) {
  return {
    cards: state.card.cards,
    decks: state.deck.decks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDeckCards: () => {
      dispatch(getDeckCards());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Flashcard);
