// import AllDeckList from "../components/Category";
// import { connect } from "react-redux";

// import {
//   updateUserDecks,
//   activateaddButton,
//   activateDeckCheckbox,
//   activateInput,
//   activateDeckInput,
//   // addCategory,
//   //deleteCategory,
//   //* 카테고리 변경사항 적용
//   editCategory,
//   activateEditButton,
//   disactivateDeckInput,
//   editDeckTitle,
//   addDeck,
//   deleteDeck,
//   setActionToDefault,
//   editDeckInServer,
//   //* 카테고리 변경사항 추가
//   addCategory,
//   editCateInServer,
//   editCateTitle,
//   deleteCategory,
// } from "../actions/allDeckListActions";

// //TODO: 얘 파일명 MypageContainer로 바꾸는거 안되는지 시도해보길 바람

// const mapStateToProps = (state) => {
//   return {
//     userId: state.mypage.id,
//     decks: state.deck.decks, //deck? deckList?
//     action: state.deck.action,
//     newCategory: state.deck.newCategory,
//     category: state.deck.category,
//   };
// };

// // * dispatch는 액션을 발생시키는 함수이다. dispatch(action)의 형태로 액션 객체를 파라미터로 넣어서 호출한다.
// // * 이 함수가 호출 되면 스토어는 리듀서 함수를 실행시켜 새로운 상태로 만들어준다.
// // * 스토어 : 프로젝트에 리덕스를 적용하기 위해 만들어졌다.

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateUserDecks: (/*userId */) => {
//       dispatch(updateUserDecks(/*userId*/));
//     },
//     activateaddButton: () => {
//       dispatch(activateaddButton());
//     },
//     activateDeckCheckbox: () => {
//       dispatch(activateDeckCheckbox());
//     },
//     editCategory: (oldCategory, newCategory) => {
//       dispatch(editCategory(oldCategory, newCategory));
//     },
//     editDeckTitle: (i, j, newTitle) => {
//       dispatch(editDeckTitle(i, j, newTitle));
//     },
//     editDeckInServer: (deckId, deckTitle) => {
//       dispatch(editDeckInServer(deckId, deckTitle));
//     },
//     activateInput: () => {
//       dispatch(activateInput());
//     },
//     activateDeckInput: (i, j) => {
//       dispatch(activateDeckInput(i, j));
//     },
//     disactivateDeckInput: (i, j) => {
//       dispatch(disactivateDeckInput(i, j));
//     },
//     //*** 덱 변경사항 추가(cateId)
//     addDeck: (userId, cateId, newDeckTitle) => {
//       dispatch(addDeck(userId, cateId, newDeckTitle));
//       dispatch(setActionToDefault());
//     },
//     deleteDeck: (category, deckId /*deck*/) => {
//       dispatch(deleteDeck(category, deckId /*deck*/));
//     },
//     //*** 카테고리 변경사항 추가
//     // addCategory: (category) => {
//     //   dispatch(addCategory(category));
//     //   dispatch(setActionToDefault());
//     // },
//     addCategory: (userId, category) => {
//       dispatch(addCategory(userId, category));
//       dispatch(setActionToDefault());
//     },
//     editCateInServer: (cateId, category) => {
//       dispatch(editCateInServer(cateId, category));
//     },
//     editCateTitle: (cateId) => {
//       dispatch(editCateTitle(cateId));
//     },
//     //? category => cateId
//     deleteCategory: (cateId) => {
//       dispatch(deleteCategory(cateId));
//     },
//     activateEditButton: () => [dispatch(activateEditButton())],
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AllDeckList);
