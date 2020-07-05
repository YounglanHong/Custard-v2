const express = require("express");
const router = express.Router();

const { decksController } = require("../controller");


//Todo: 라우터 주소 이름 수정해야한다. 올바른 예시를 찾아서 수정해보자

//! category.js  전체 카테고리 정보 불러오기 및 카테고리 추가
router.post("/infoCate", decksController.category.post);              //* 카테고리 추가
router.get("/infoCate", decksController.category.get);                //*  전체 유저의 카테고리 + 덱 정보
router.patch("/infoCate", decksController.category.patch);            //* 카테고리 이름 수정  
// ! 수정 된 데이터는 아래의 update_cate.post로 불러온다.
router.delete("/infoCate", decksController.category.delete);          // ! 카테고리 제거 (카테고리 지울시 전체 덱+ 카드가 지워집니다.)

//? update_cate.js  카테고리의 이름 업데이트, 수정된 정보 읽기, 제거
router.post("/cate", decksController.update_cate.post); //* 수정된 카테고리의 정보 읽기




//router.delete("/cate", decksController.update_cate.delete); //* 카테고리 제거(컬럼이 다 지워지므로 전체 제거 위험)
//router.patch("/cate", decksController.update_cate.patch); //* 카테고리 이름 수정







//? deck.js  카테고리의 이름 업데이트, 수정된 정보 읽기, 제거
router.post("/infoDeck", decksController.deck.post); //* 업데이트된 덱 이름 불러오기 
//router.get("/infoDeck", decksController.deck.get);



//? deck_cate.js  카테고리의 이름 업데이트, 수정된 정보 읽기, 제거
router.delete("/deck", decksController.update_deck.delete); //* 덱 제거(컬럼이 다 지워지므로 전체 제거 위험)
router.patch("/deck", decksController.update_deck.patch); //* 덱 이름 수정
// ! 수정 된 데이터는 위의 deck.post로 불러온다.
router.post("/deck", decksController.update_deck.post); //* 수정된 덱의 정보 읽기

module.exports = router;
