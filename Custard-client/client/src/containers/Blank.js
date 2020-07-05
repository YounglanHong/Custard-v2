import Blank from "../components/Blank";
import { connect } from "react-redux";
import { getDeckCards } from "../actions/cardActions";

//TODO: 얘 파일명 -Container로 바꾸는거 안되는지 시도해보길 바람

const mapStateToProps = (state) => {
  return {
    cards: state.card.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDeckCards: () => {
      dispatch(getDeckCards());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blank);
