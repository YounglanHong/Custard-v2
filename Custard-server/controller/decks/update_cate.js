const { User, Deck, Category } = require("../../models");

//!  카테고리의  수정, 삭제

module.exports = {
  //  todo: 카테고리 내용 수정뒤에 다시 post요청을 보내어 수정된 정보를 보내준다.
  //  todo: post요청시에는 특별한 요청에 따른 정보를 보여준다.
  post: (req, res) => {
    //Todo: 유저의 아이디 또는 카테고리 아이디로 수정이 필요하다. (유저의 아이디 일 경우 같은 이름을 가진 카테고리 다 바뀜)
    Category.findOne({
      where: {
        id: `${req.body.id}`, //? 덱_아이디에 맞는 데이터를 줘야한다.  ex)   1 or woody
        //category: `${req.body.category}` //? 카테고리 내용이 있는지 확인 (중복검사)   ex)   english
      }
    })
      .then(data => {
        res.status(200).send({
          category: data.dataValues.category       // ! 변경된 카테고리 데이터를 보내준다. 
        });
      })
      .catch(err => {
        console.error(err);
      });
  },

  
  // // 카테고리 제목 수정시
  // // todo:  카테고리 id를 따로 추가 같은 카테고리 끼리 id를 묶어줄 역할 pk는 문제가 되므로 .. 새 카테고리 추가시 카테고리 id 값이 +1이 되야한다..
  // patch: (req, res) => {
  //   Deck.update(
  //     { category: req.body.category }, // ? 변경할 내용 (카테고리)
  //     {
  //       where: { category_id: req.body.category_id } //! DECK 테이블 id를 검색하여 그 값에 해당하는 카테고리를 새 내용으로 바꾼다.
  //     }
  //   )
  //     .then(data => {
  //       res.status(200).send(data); // ? [0]은 수정안됨(이미 같은게 있음),   [1]은 수정됨
  //       //     console.log("변경성공, 카테고리 이름은:", data.dataValues.category);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // },
  // // TODO: 카테고리 삭제. 같은 이름의 카테고리가 있다면 삭제 -> 카테고리를 삭제하면 덱, 카드 도 같이 삭제 되어야한다..
  // delete: (req, res) => {
  //   Deck.destroy({ where: { category: req.body.category } })
  //     .then(data => {
  //       res.json(data); // Todo: 제거 후의 클라이언트에서의 데이터 상태 봐서 보내줄 부분 추가
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }
};
