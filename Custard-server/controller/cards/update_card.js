const { Card, Deck } = require("../../models");

//!  카드내용의 수정, 삭제

module.exports = {
  // todo: 카드 내용의 수정시.. 질문, 답변, 노트 등 다 바꾸거나 일부만 변경시에는... 그때마다 조건을 주어야하나..?
  patch: (req, res) => {
    Card.update(
      {
        cardtype: req.body.cardtype,
        question: req.body.question,
        answer: req.body.answer,
        answer_target: req.body.answer_target, //* answer_target 추가
        hint: req.body.hint //* hint 추가
      },
      {
        where: { id: req.body.id } //* deck_id => card id로 조건 변경
        //!//DECK 테이블 id를 검색하여 그 값에 해당하는 카테고리를 새 내용으로 바꾼다.
        //todo: deck_id와 연결된 내용이 수정됨. 그러므로 card_id로 해야하는데..
        //todo: 이것도 많은 컬럼 추가시 문제...ㅜㅜ
      }
    )
      .then(data => {
        res.status(200).send(data); // ? [0]은 수정안됨(이미 같은게 있음),   [1]은 수정됨
        //     console.log("변경성공, 카테고리 이름은:", data.dataValues.category);
      })
      .catch(err => {
        console.error(err);
      });
  },

  //  todo: 카테고리 내용 수정뒤에 다시 post요청을 보내어 수정된 정보를 보내준다.
  //  todo: post요청시에는 특별한 요청에 따른 정보를 보여준다.
  post: (req, res) => {
    //Todo: 유저의 아이디 또는 카테고리 아이디로 수정이 필요하다. (유저의 아이디 일 경우 같은 이름을 가진 카테고리 다 바뀜)
    //? findAll로  deck_id가 같은 모든 카드의 내용들을 보여주게 한다.
    Card.findAll({
      where: {
        // deck_id: `${req.body.deck_id}`, //? 덱 아이디로 검색한다.
        id: `${req.body.id}` //* deck_id => card id로 조건 변경
      }
    })
      .then(data => {
        res.status(200).send({ data });
      })
      .catch(err => {
        console.error(err);
      });
  },

  // TODO: 카드 삭제. 같은 이름의 카드 있다면 삭제 -> 카테고리를 삭제하면 덱, 카드 도 같이 삭제 되어야한다..
  //! card 테이블에서는 이름이 없으므로 일단 card_id로 삭제한다.
  delete: (req, res) => {
    Card.destroy({ where: { id: req.body.id } })
      .then(data => {
        res.json(data); // Todo: 제거 후의 클라이언트에서의 데이터 상태 봐서 보내줄 부분 추가
      })
      .catch(err => {
        console.error(err);
      });
  }
};
