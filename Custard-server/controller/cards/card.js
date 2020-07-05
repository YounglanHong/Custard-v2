const { Card, Deck } = require("../../models");
//! 덱 이름을 클릭하면 나오는 카드 부분 (유저, 덱, 카드 모든 부분의 정보가 필요할 것..)
// TODO: 업데이트, 제거 등의 API로직 필요, 클라이언트에서 어느 부분인지 알아야한다.(특히 저장된 내용들 가져오는 부분(SHOW))
// Todo: 현재 상태에서 user와 card 테이블이 연결되지 않아. 클라이언트에서 deck 또는 user의 정보를 받아 props 등으로
// todo: - 카드까지 데이터를 전달해야 할 것 같다. (user와 카드도 연결해야하나..?)
module.exports = {
  //* get 요청시 db에 저장 되어있는 모든 데이터들이 다 보여질 것이다.
  get: (req, res) => {
    Card.findAll({
      include: [
        {
          model: Deck, //*  Deck모델 포함
          attributes: ["title", "user_id"], //TODO: Deck모델에서 카테고리와, 타이틀, 유저 아이디 가져옴 필요한 것들 더 추가.
         //required: true
        }
      ]
    })
      .then(result => {
        res.json(result); //* json형식으로 반환
      })
      .catch(err => {
        console.error(err);
      });
  },
  // * post요청시 카드의 정보가 없으면 새로 추가합니다. 필요한 것,
  // *  text type? 카드 타입,  question(추가가능), answer(추가가능)
  post: (req, res) => {
    Card.findOne({
      where: {
        deck_id: `${req.body.deck_id}`, //? 덱 아이디로 검색한다. 덱 번호와 같은 번호가 있으면 충돌
        cardtype: `${req.body.cardtype}`, //? 카드타입 EX) Fill-in-the-blank (번호화 할까..??)
        question: `${req.body.question}`, //? 질문
        answer: `${req.body.answer}`, //? 답
        answer_target: `${req.body.answer_target}`, // ? 여기가 힌트???
        hint: `${req.body.hint}`
      }
    }).then(data => {
      // ! where에 있는 내용들과 동일한 내용이 db에 있다면 에러 메시지 전송
      if (data) {
        res.status(200).json(data.dataValues);
        console.log("저장되어 있는 내용 보여준다.", data.dataValues);
      } else {
        //? 중복되지 않는다면 디비에 card 추가 하고 json형태로 뿌려준다.
        Card.create({
          deck_id: `${req.body.deck_id}`, //? 덱 아이디
          cardtype: `${req.body.cardtype}`, //? 카드타입 EX) Fill-in-the-blank (번호화 할까..??)
          question: `${req.body.question}`, //? 질문
          answer: `${req.body.answer}`, //? 답
          answer_target: `${req.body.answer_target}`, // ? 여기가 힌트???
          hint: `${req.body.hint}`
        }).then(data => {
          res.status(201).json(data);
        });
      }
    });
  }
};
