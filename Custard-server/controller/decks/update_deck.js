const { Deck } = require("../../models");

//!  덱의 타이틀 수정, 삭제

module.exports = {
  //  todo: 타이틀 내용 수정뒤에 다시 post요청을 보내어 수정된 정보를 보내준다.
  //  todo: post요청시에는 특별한 요청에 따른 정보를 보여준다.
  post: (req, res) => {
    //Todo: 유저의 아이디 또는 카테고리 아이디로 수정이 필요하다. (유저의 아이디 일 경우 같은 이름을 가진 카테고리 다 바뀜)
    Deck.findOne({
      where: {
        id: `${req.body.id}`, //? 덱_아이디에 맞는 데이터를 줘야한다.  ex)   1 or woody
       // title: `${req.body.title}` //? 타이틀 내용이 있는지 확인 (중복검사)   ex)  grammar master
      }
    })
      .then(data => {
        res.status(200).send({
          title: data.dataValues.title
        });
      })
      .catch(err => {
        console.error(err);
      });
  },

  // Todo: 덱 제목 수정시 -> 수정된 제목은 카드에도 적용되어야 한다.
  patch: (req, res) => {
    Deck.update({ title: req.body.title }, // ? 변경할 내용 (덱 타이틀)
      {
        where: { id: req.body.id } //! DECK 테이블 id를 검색하여 그 값에 해당하는 덱 타이틀을 새 내용으로 바꾼다.
      }
    )
      .then(data => {
        res.status(200).send(data); // ? [0]은 수정안됨(이미 같은게 있음),   [1]은 수정됨
        //     console.log("변경성공, 덱 이름은:", data.dataValues.title);
      })
      .catch(err => {
        console.error(err);
      });
  },










  // TODO: 덱 삭제. 같은 이름의 덱이 있다면 삭제 -> 덱을 삭제하면 카드 도 같이 삭제 되어야한다..
  // TODO: 카테고리나, 덱 추가시 무분별하게 컬럼 수가 늘어나서, Id만으로는 제거가 힘들다. (동일한 이름일 경우 제거)
  // todo: 또는 유저아이디나 구분 할 만한 것을 찾아서 연동 시킨 후 제거한다.
  delete: (req, res) => {
    Deck.destroy({ where: { id: req.body.id } })
      .then(data => {
        res.json(data); // Todo: 제거 후의 클라이언트에서의 데이터 상태 봐서 보내줄 부분 추가
      })
      .catch(err => {
        console.error(err);
      });
  }
};
