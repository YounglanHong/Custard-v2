import axios from "axios";

export const UPDATE_USER_DECKS = "UPDATE_USER_DECK";
export const SET_ACTION_TO_DEFAULT = "SET_ACTION_TO_DEFAULT";
export const ACTIVATE_ADD_BUTTON = "ACTIVATE_ADD_BUTTON";
export const ACTIVATE_DECK_CHECKBOX = "ACTIVATE_CHECKBOX";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const ACTIVATE_INPUT = "ACTIVATE_INPUT";
export const ACTIVATE_EDIT_BUTTON = "ACTIVATE_EDIT_BUTTON";
export const ADD_DECK = "ADD_DECK";
export const ACTIVATE_DECK_INPUT = "ACTIVATE_DECK_INPUT";
export const DISACTIVATE_DECK_INPUT = "DISACTIVATE_DECK_INPUT";
export const EDIT_DECK_TITLE = "EDIT_DECK_TITLE";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const DELETE_DECK = "DELETE_DECK";
// export const ADD_CATEGORY_TO_SERVER = "ADD_CATEGORY_TO_SERVER" ;
export const ACTIVATE_CATE_INPUT = "ACTIVATE_CATE_INPUT";
export const DISACTIVATE_CATE_INPUT = "DISACTIVATE_CATE_INPUT";

//! 카테고리 변경되면서 불러오는 데이터도 달라짐
export function updateUserDecks(/*userId*/) {
  return dispatch => {
    axios
      .get("http://15.165.162.24:4000/deck/infoCate")
      .then(res => {
        console.log(res);
        dispatch(updateUserDecksToStore(res.data));
        //? dispatch(addDeck());
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
//! 카테고리 변경되면서 불러오는 데이터도 달라짐(UPDATE_USER_CATEGORY)
export function updateUserDecksToStore(category) {
  return {
    type: UPDATE_USER_DECKS,
    category: category
  };
}

//************* 카테고리 변경사항 추가 ******************/
//TODO: 카테고리 추가
export function addCategory(userId, category) {
  return dispatch => {
    axios
      .post("http://15.165.162.24:4000/deck/infoCate", {
        user_id: userId,
        category: category
      })
      .then(res => {
        //console.log(res);
        //updateUserDecks();
        dispatch(addCategoryInStore(res.data /*category*/));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}
export function addCategoryInStore(cate) {
  return {
    type: ADD_CATEGORY,
    cate: cate
  };
}

//TODO: 카테고리 수정
export function editCateInServer(cateId, category) {
  return dispatch => {
    axios
      .patch("http://15.165.162.24:4000/deck/infoCate", {
        id: cateId,
        category: category
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

//TODO: 카테고리 이름 수정 후 다시 불러오기
export function editCateTitle(cateId) {
  return dispatch => {
    axios
      .post("http://15.165.162.24:4000/deck/cate", {
        id: cateId
      })
      .then(res => {
        console.log(res); // "category": "brazil"
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

//TODO: 카테고리 제거
//! 카테고리 삭제 시, 덱도 삭제(경고창 필요)
export function deleteCategory(cateId) {
  return dispatch => {
    axios
      .delete("http://15.165.162.24:4000/deck/infoCate", {
        data: { id: cateId }
      })
      .then(res => {
        console.log(res);
        dispatch(deleteCateInStore(cateId));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

//? category => category_id
export function deleteCateInStore(cateId /*deck*/) {
  return {
    type: DELETE_CATEGORY,
    category_id: cateId
  };
}

//***************************************************/

export function setActionToDefault() {
  return {
    type: SET_ACTION_TO_DEFAULT
  };
}

/**
 *  * 상태에 어떠한 변화가 필요하면 액션이라는 것이 발생한다. 하나의 객체로 표현된다.
 *  * 액션 객체는 type 필드를 반드시 가지고 있어야 한다.
 */

// action creator 액션 객체를 만들어 주는 생성 함수
export function activateaddButton() {
  return {
    type: ACTIVATE_ADD_BUTTON // ACTIVATE_ADD_BUTTON 이라는 액션 이름
  };
}

export function activateInput() {
  return {
    type: ACTIVATE_INPUT
  };
}

//TODO: server
//TODO: state를 업데이트하기 전에 .post()요청을 보내 추가된 deck을 db에 저장해야 합니다.
//예시:
// export function addDecktoServer() {
// return (dispatch) => {
//   console.log(dispatch)
//   axios
//     .post('http://15.165.162.24:4000/deck/addDeck')
//     .then((res) => {
//       console.log(res);
//         dispatch( addDeck());
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };
//}

//****************** 카테고리 서버 변경사항 추가 ****************/
//TODO: deck 생성
//? category => cateId
//http://15.165.162.24:4000/deck/infoDeck
export function addDeck(userId, cateId, newDeckTitle) {
  console.log(userId);
  console.log(cateId);
  console.log(newDeckTitle);
  return dispatch => {
    axios
      .post("http://15.165.162.24:4000/deck/infoDeck", {
        user_id: userId,
        category_id: cateId,
        title: newDeckTitle
      })
      .then(res => {
        console.log("successfully added deck to db!");
        console.log(res);
        dispatch(addDeckToStore(cateId, newDeckTitle));
        dispatch(updateUserDecks());
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

export function addDeckToStore(cateId, newDeckTitle) {
  return {
    type: ADD_DECK,
    category_id: cateId,
    newDeckTitle: newDeckTitle
  };
}

export function activateDeckCheckbox() {
  console.log("delete button clicked");
  return {
    type: ACTIVATE_DECK_CHECKBOX
  };
}
/*
export function deleteCategoryinServer() {
  console.log('getting user info...');
  return (dispatch) => {
    axios
      .post('http://15.165.162.24:4000/user/info')
      .then((res) => {
        if (res.data === 'no') {
          dispatch(forceLogOut());
        } else {
          console.log(res.data);
          dispatch( deleteCategory());

        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
*/

//TODO: server
//TODO: addDeck 함수와 마찬가지로, state를 업데이트하기 전에 .post()요청을 보내 추가된 category를 db에 저장해야 합니다.
// !현재상태 디비에 저장까지 됨// 화면에 적용됨// 저장은 안됨(휘발성)
// export function addCategory(category) {
//   axios
//     .post("http://15.165.162.24:4000/deck/addCate", {
//       category: category
//     })
//     .then(data => {
//       console.log(data);
//     });
//   return {
//     type: ADD_CATEGORY,
//     category: category
//   };
// }

// export function addCategorytoServer(category) {
// return (dispatch) => {

//   console.log(dispatch)
//   axios.post('http://15.165.162.24:4000/deck/addDeck',{
//        category: category
//   }).then((res) => {
//       console.log(res);
//         dispatch(addCategory());
//     }).catch((error) => {
//       console.log(error.message);
//     });
// };
// }

// export function addCategory(category) {
//   return {
//     type: ADD_CATEGORY,
//     category: category     // 카테고리에  추가한 내용이 남게 한다.
//   };
// }

//TODO: server
export function editCategory(oldCategory, newCategory) {
  return {
    type: EDIT_CATEGORY,
    oldCategory: oldCategory,
    newCategory: newCategory
  };
}

//? 카테고리 변경사항이지만 필수x (isEditing 추가해야 함)
// export function activateCateInput(i) {
//   return {
//     type: ACTIVATE_CATE_INPUT,
//     categoryIdx: i,
//   };
// }
// export function disactivateCateInput(i) {
//   return {
//     type: DISACTIVATE_CATE_INPUT,
//     categoryIdx: i,
//   };
// }
//* 카테고리 변경사항 적용
export function activateDeckInput(i, j) {
  return {
    type: ACTIVATE_DECK_INPUT,
    categoryIdx: i,
    deckIdx: j
  };
}
export function disactivateDeckInput(i, j) {
  return {
    type: DISACTIVATE_DECK_INPUT,
    categoryIdx: i,
    deckIdx: j
  };
}

//TODO: server
export function editDeckTitle(i, j, newTitle) {
  return {
    type: EDIT_DECK_TITLE,
    categoryIdx: i,
    deckIdx: j,
    newTitle: newTitle
  };
}

export function editDeckInServer(deckId, deckTitle) {
  return dispatch => {
    axios
      .patch("http://15.165.162.24:4000/deck/deck", {
        id: deckId,
        title: deckTitle
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

//! 백과 통신하는 함수 예시
//TODO: redux-thunk 라이브러리 설치 -> 비동기 작업 수행 가능

// export function deleteCategory(category) {
//   console.log("trying to delete category in db");
//   console.log(category);
//   console.log(typeof category);
//   return (dispatch) => {
//     axios
//       .delete("http://15.165.162.24:4000/deck/cate", {
//         data: { category: category },
//       })
//       .then((res) => {
//         console.log(res);
//         dispatch(deleteCategoryInStore(category));
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };
// }

// //http://15.165.162.24:4000/deck/cate
// // {"category": "English"
// // }

// //TODO: server
// //서버와 db에도 카테고리가 삭제 되었음을 알리고 변경사항을 반영할 수 있도록 .post()요청을 보내고
// //post 요청이 성공적으로 수행 되었을 때 비로소 이하의 deleteCategory가 실행될 수 있도록 해야합니다.
// export function deleteCategoryInStore(category) {
//   return {
//     type: DELETE_CATEGORY,
//     category: category,
//   };
// }

export function deleteDeck(category, deckId) {
  return dispatch => {
    axios
      .delete("http://15.165.162.24:4000/deck/deck", {
        data: {
          id: deckId
        }
      })
      .then(res => {
        console.log(res);
        dispatch(deleteDeckInStore(category, deckId));
      })
      .catch(error => {
        console.log(error.message);
      });
  };
}

//TODO: server
export function deleteDeckInStore(cate, deckId /*deck*/) {
  return {
    type: DELETE_DECK,
    cate: cate,
    deckId: deckId
    //deck: deck
  };
}

export function activateEditButton() {
  return { type: ACTIVATE_EDIT_BUTTON };
}

//TODO: 2시 02시로, 2월 02월로 표시되게 바꿔야함.
export function formatTimestamp(date) {
  var yyyy = date.getFullYear();
  var month = date.getMonth();
  var dd = date.getDate();
  var HH = date.getHours();
  var mm = date.getMinutes();
  var ss = date.getSeconds();

  var format = [yyyy, month, dd].join("-") + " " + [HH, mm, ss].join(":");
  return format;
}
