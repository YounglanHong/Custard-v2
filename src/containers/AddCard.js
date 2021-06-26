import AddCard from "../components/AddCard";
import { connect } from "react-redux";

import { addCard } from "../actions/cardActions";
import { updateUserDecks } from "../actions/allDeckListActions";

//TODO: 얘 파일명 AddCardContainer로 바꾸는거 안되는지 시도해보길 바람

const mapStateToProps = (state) => {
  return {
    userId: state.mypage.id,
    decks: state.deck.decks,
    category: state.deck.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDecks: (userId) => {
      dispatch(updateUserDecks(userId));
    },
    addCard: (cardType, category, deckId, validAddCardForm) => {
      dispatch(addCard(cardType, category, deckId, validAddCardForm));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
