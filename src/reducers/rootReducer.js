import { combineReducers } from "redux";

import mypageReducer from "./mypageReducer";
import deckReducer from "./deckReducer";
import cardReducer from "./cardReducer";
// import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  mypage: mypageReducer,
  deck: deckReducer,
  card: cardReducer,
  // category: categoryReducer
});

export default rootReducer;
