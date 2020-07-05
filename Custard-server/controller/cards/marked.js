const { Card } = require("../../models");

module.exports = {
  //* marked 값 카운트가 1씩 증가
  patch: (req, res) => {
    Card.update(
      {
        marked: req.body.marked
      },
      {
        where: {
          id: req.body.id // 카드 테이블의 아이디 값
        }
      }
    )
      .then(data => {
        console.log("요청 받은 아이디 값", req.body.id);
        // boolean 0 or 1
        let values = { marked: "1" };
        let condition = { where: { id: req.body.id } };
        Card.update(values, condition);
        console.log(data, "넘어오는 데이터 ");
        res.status(200).send(data); // 0 or 1
      })
      .catch(err => {
        console.error(err, "에러");
      });
  },

  //* 업데이트 된 정보
  post: (req, res) => {
    Card.findOne({
      where: {
        id: `${req.body.id}` //? 아이디로 검색한다.
      }
    })
      .then(data => {
        res.status(200).send(data);
        //! 업데이트 성공 시 1, 실패 시 0이어야 하는데 반대(DB에는 반영)
      })
      .catch(err => {
        console.error(err, "에러");
      });
  }
};
