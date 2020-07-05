const { Card } = require("../../models");

module.exports = {
  //? 여기는 업데이트 된 정보 돌려준다. (마지막에 결과? 정도!)
  post: (req, res) => {
    //! 카드의 아이디 값과  어떤 데이터 (wrong  또는 correct)에 따라서 업데이트 되는 정보가 다르다

    Card.findOne({
      where: {
        id: `${req.body.id}` //? 아이디로 검색한다.
      }
    })

      .then(data => {
        res.status(200).send(data); // 0 or 1
      })
      .catch(err => {
        console.error(err, "에러");
      });
  },

  //todo : correct 값 + 공부한 시간 + coverd  증가 해야한다.

  //todo:  wrong과 correct 선택시 카운트가 1씩 증가해야한다.

  patch: (req, res) => {
    const today = new Date();
    Card.update(
      {
        last_studied: today // 마지막 공부 시간 변경 성공
      },
      {
        where: {
          id: req.body.id // 카드 테이블의 아이디 값
        }
      }
    )
      .then(data => {
        // todo : correct과 wrong버튼을 누름에 따라 id와 correct 버튼이 전송되어야 싶다.
        console.log("요청 받은 아이디 값", req.body.id);
        Card.increment(
          { correct: 1, covered: 1 },
          { where: { id: req.body.id } }
        );
        console.log(data, "넘어오는 데이터 ");
        res.status(200).json(data); // 0 or 1
      })
      .catch(err => {
        console.error(err, "에러");
      });
  }
};
