const express = require("express");
const router = express.Router();

const { cardsController } = require("../controller");

//* card.js 의 컨트롤러 내용
router.post("/cardInfo", cardsController.card.post); // * post요청시 없으면 카드생성
router.get("/cardInfo", cardsController.card.get); // * get 요청 저장된 deck, card의 전체 내용을 보여준다.

//* update_card.js
router.delete("/up-card", cardsController.update_card.delete); //* 덱 제거(컬럼이 다 지워지므로 전체 제거 위험)
router.patch("/up-card", cardsController.update_card.patch); //* 덱 이름 수정
router.post("/up-card", cardsController.update_card.post); //* 수정된 덱의 정보 읽기

router.patch("/correct", cardsController.correct.patch); //* correct 버튼을 누르면 최근 공부시간, correct, covered(몇 번 공부했는지)가 1 증가
router.post("/correct", cardsController.correct.post); //*  업데이트된 내용을 불러옵니다.

router.patch("/wrong", cardsController.wrong.patch); //* wrong 버튼을 누르면 최근 공부시간, wrong, covered(몇 번 공부했는지)가 1 증가
router.post("/wrong", cardsController.wrong.post); //* 업데이트된 내용을 불러옵니다.

router.patch("/marked", cardsController.marked.patch); //* marked 버튼을 누르면 marked의 T/F 변화
router.post("/marked", cardsController.marked.post); //* 업데이트된 내용을 불러옵니다.

router.patch("/hinted", cardsController.hinted.patch); //* hinted 버튼을 누르면 hinted가 1 증가
router.post("/hinted", cardsController.hinted.post); //* 업데이트된 내용을 불러옵니다.

module.exports = router;
