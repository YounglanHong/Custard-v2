//TODO: for 문으로 작성된 reducer 함수 더 깔끔하게 고쳐야
//TODO: state에서 action 속성 지워도 될 듯

import {
  //UPDATE_USER_INFO,
  SET_ACTION_TO_DEFAULT,
  ACTIVATE_ADD_BUTTON,
  ADD_CATEGORY,
  UPDATE_USER_DECKS,
  EDIT_CATEGORY,
  ACTIVATE_DECK_CHECKBOX,
  ACTIVATE_INPUT,
  ACTIVATE_DECK_INPUT,
  DISACTIVATE_DECK_INPUT,
  EDIT_DECK_TITLE,
  ACTIVATE_EDIT_BUTTON,
  ADD_DECK,
  DELETE_CATEGORY,
  formatTimestamp,
} from "../actions/allDeckListActions.js";
// import { CardActions } from "@material-ui/core";

// const initialState = {
//   decks: [
//     {
//       category: "English",
//       decks: [
//         {
//           user_id: 1,
//           id: 5,
//           title: "Netflix - Rick and Morty",
//           author: "Min",
//           isEditing: false,
//           created_at: "2020-03-05",
//           last_updated_at: "2020-03-06",
//           is_public: true,
//           is_paid: false,
//         },
//         {
//           user_id: 1,
//           id: 7,
//           title: "TOEIC",
//           author: "Hackers",
//           isEditing: false,
//           created_at: "1990-10-19",
//           last_updated_at: "2006-05-11",
//           is_public: true,
//           is_paid: true,
//         },
//       ],
//       isEditing: false,
//     },
//     {
//       category: "French",
//       decks: [
//         {
//           user_id: 1,
//           id: 3,
//           title: "DELF",
//           author: "AF",
//           isEditing: false,
//           created_at: "2008-10-10",
//           last_updated_at: "2008-11-31",
//           is_public: true,
//           is_paid: true,
//         },
//       ],
//       isEditing: false,
//     },
//   ],
//   action: "",
// };
const initialState = {
  category: [
    {
      id: 1,
      category: "korea",
      user_id: 1,
      Decks: [
        {
          id: 27,
          author: null,
          title: "masterpiece",
          is_public: true,
          is_paid: false,
          created_at: "2020-04-01T07:48:28.000Z",
          last_updated_at: "2020-04-01T07:48:28.000Z",
          user_id: 1,
          category_id: 1,
          CategoryId: 1,
          UserId: 1,
        },
      ],
      User: {
        id: 1,
        email: "kkscpower@naver.com",
        username: "park",
        image: "/account.png",
      },
    },
    {
      id: 2,
      category: "english",
      user_id: 2,
      Decks: [
        {
          id: 30,
          author: null,
          title: "masterpiece",
          is_public: true,
          is_paid: false,
          created_at: "2020-04-01T08:02:03.000Z",
          last_updated_at: "2020-04-01T08:02:03.000Z",
          user_id: 2,
          category_id: 7,
          CategoryId: 7,
          UserId: 2,
        },
      ],
      User: {
        id: 2,
        email: "woodypark90@gmail.com",
        username: "박성용",
        image: "/account.png",
      },
    },
  ],
};

//* 액션을 만들어 발생시키면 리듀서가 현재 상태와 전달 받은 액션 객체를 파라미터로 받아온다.
//* 두 값을 참고하여 새로운 상태를 만들어 반환해 준다.

//* case에 따라 변화가 생긴다.
//! UPDATE_USER_DECKS는 사실상 UPDATE_USER_CATEGORY
const reducer = (state = initialState, action) => {
  switch (action.type) {
    //* 카테고리 변경 사항 적용
    case UPDATE_USER_DECKS:
      console.log("action.category", action.category);
      console.log(action);
      for (let i = 0; i < action.category.length; i++) {
        for (let j = 0; j < action.category[i].Decks.length; j++) {
          action.category[i].Decks[j]["isEditing"] = false;
        }
      }
      console.log(action.category);
      return Object.assign({}, state, { category: action.category });
    case SET_ACTION_TO_DEFAULT:
      return Object.assign({}, state, { action: "" });

    case ACTIVATE_ADD_BUTTON:
      return Object.assign({}, state, { action: "add_deck" });

    case ACTIVATE_DECK_CHECKBOX:
      return Object.assign({}, state, { action: "select" });

    case ACTIVATE_INPUT:
      return Object.assign({}, state, { action: "add_category" });

    case ACTIVATE_EDIT_BUTTON:
      return Object.assign({}, state, { action: "edit" });

    //******************** 카테고리 변경 사항 적용 *************************/
    case ACTIVATE_DECK_INPUT:
      const activatedDeckInputDecks = [...state.category];
      // console.log(activatedDeckInputDecks[action.categoryIdx]);
      activatedDeckInputDecks[action.categoryIdx].Decks[
        action.deckIdx
      ].isEditing = true;
      return Object.assign({}, state, { category: activatedDeckInputDecks });

    case DISACTIVATE_DECK_INPUT:
      const disactivatedDeckInputDecks = [...state.category];
      disactivatedDeckInputDecks[action.categoryIdx].Decks[
        action.deckIdx
      ].isEditing = false;
      return Object.assign({}, state, { category: disactivatedDeckInputDecks });

    case ADD_CATEGORY:
      /*let newCategory = {
        cate: action.cate,
        category: []
      };*/
      //console.log(action.cate);
      let newCategory = [...state.category, action.cate];
      //console.log(newCategory);
      return {
        ...state,
        category: newCategory,
      };
    // let newCategory = {
    //   cate: action.cate,
    // };
    // return { ...state, category: [...state.category, newCategory] };
    case EDIT_CATEGORY:
      const editedCategoryState = { ...state };
      console.log(editedCategoryState);
      for (let i = 0; i < editedCategoryState.length; i++) {
        if (editedCategoryState[i].category === action.oldCategory) {
          editedCategoryState[i].category = action.newCategory;
        }
      }
      console.log(editedCategoryState);
      return editedCategoryState;

    case EDIT_DECK_TITLE:
      const editedDeckDecks = [...state.category];
      editedDeckDecks[action.categoryIdx].Decks[action.deckIdx].title =
        action.newTitle;
      return Object.assign({}, state, { category: editedDeckDecks });

    // case DELETE_CATEGORY:
    //   const deleteCategoryState = [];
    //   for (let i = 0; i < state.decks.length; i++) {
    //     if (state.decks[i].category !== action.category) {
    //       deleteCategoryState.push(state.decks[i]);
    //     }
    //   }
    //   console.log(deleteCategoryState);
    //   return Object.assign({}, state, { decks: deleteCategoryState });

    case DELETE_CATEGORY:
      const deleteCategoryState = [];
      for (let i = 0; i < state.category.length; i++) {
        //console.log(state.category);
        if (state.category[i].id !== action.category_id) {
          deleteCategoryState.push(state.category[i]);
        }
      }
      //console.log(deleteCategoryState);
      return Object.assign({}, state, { category: deleteCategoryState });

    //TODO: 카테고리 변경사항 적용 필요
    // case DELETE_DECK:
    //   const deletedDeckState = [];
    //   for (let i = 0; i < state.category.length; i++) {
    //     if (state.category[i].category !== action.category) {
    //       deletedDeckState.push(state.category[i]);
    //     } else {
    //       const deletedDeck = { cate: action.cate, category: [] };
    //       console.log(deletedDeck);
    //       for (let j = 0; j < state.category[i].Decks.length; j++) {
    //         if (state.category[i].Decks[j].id !== action.deckId) {
    //           deletedDeck.Decks.push(state.category[i].Decks[j]);
    //         }
    //       }
    //       console.log(deletedDeck);
    //       deletedDeckState.push(deletedDeck);
    //     }
    //   }
    //   return Object.assign({}, state, { decks: deletedDeckState });

    //***************************************************************/
    //!Add_deck
    case ADD_DECK:
      const newDeck = {
        title: action.newDeckTitle,
        author: "user",
        created_at: formatTimestamp(new Date()), //TODO: format 해줘야 되는건가?
        last_updated_at: formatTimestamp(new Date()), //TODO: 정렬하려면 안하는게 낫지 않은가 싶기도
        is_public: true,
        is_paid: false,
      };
      const addedDecks = [...state.category];
      for (let i = 0; i < addedDecks.length; i++) {
        if (addedDecks[i].id === action.cateId) {
          addedDecks[i].Decks.push(newDeck);
        }
      }
      return Object.assign({}, state, { category: addedDecks });
    default:
      return state;
  }
};

export default reducer;
