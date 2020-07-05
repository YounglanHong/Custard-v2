module.exports = {
  //모든 유저의 constoller를 가져온다..
  card: require("./card"), // * 카드 정보, 추가
  update_card: require("./update_card"), //* 카드의 수정 삭제
  correct: require("./correct"),
  wrong: require("./wrong"),
  marked: require("./marked"),
  hinted: require("./hinted")
};
