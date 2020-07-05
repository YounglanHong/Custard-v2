module.exports = {
  // * deck 폴더에 있는 모든 요청사항을 가져온다.

  update_cate: require("./update_cate"), // * 카테고리의 수정, 수정된 정보, 제거, 제거된 정보
  category: require("./category"), // * 카테고리 정보 읽기, 정보 추가

  deck: require("./deck"), // * 덱의 정보(이름) 읽기, 정보 추가
  update_deck: require("./update_deck") // * 덱 이름의 수정, 수정된 정보, 제거, 제거된 정보
};
