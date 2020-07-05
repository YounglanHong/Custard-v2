const { User, Deck , Category} = require("../../models");

//! 0401  카테고리의 읽기, 추가, 수정, 삭제
module.exports = {
  
  //todo: get 요청시 모든 유저의 정보와 카테고리 덱의 내역을 보여준다.
  get: (req, res) => {
    Category.findAll({
      include: [
        {
          model: Deck, //*  User모델 포함
       //   attributes: ["id", "title"],
          //required: true
        },
        {
          model: User, //*  User모델 포함
          attributes: ["id", "email", "username", "image"], //*  이메일과, 유저이름 정보도 포함.
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



  //  todo: post요청시에는 특별한 요청에 따른 정보를 보여준다.

  //!  04/01  현재 새로 카테고리 테이블에다가 user_id 와 category 이름을 추가하여 저장 성공 
  post: (req, res) => {
    //중복카테고리가 없도록 미리 데이터가 있는지 검색하기
    Category.findOne({
      where: {
        user_id: `${req.body.user_id}`, //? 유저 아이디에 맞는 데이터를 줘야한다.    ex)   1 or woody
        category: `${req.body.category}` //? 카테고리 내용이 있는지 확인 (중복검사)   ex)   english
      }
    })
      .then(data => {
        //TODO: 이미 관련된 데이터가 있다면 저장된 내용을 보여준다.
        if (data) {
          res.status(200).json(data.dataValues);
          console.log("저장되어 있는 내용 보여준다.", data.dataValues);
        } else {
          //? 중복되지 않는다면 디비에 카테고리 추가
          Category.create({
            category: `${req.body.category}`, //? 카테고리 추가
            user_id: `${req.body.user_id}` //? 유저 아이디 추가(어떤 유저가 추가했는지 디비에 저장필요)
          }).then(data => {
            res.status(201).json(data.dataValues);
            // console.log("저장성공, 카테고리 이름은:", data.dataValues.category);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  },

  patch: (req, res) => {
    Category.update(
      { category: req.body.category }, // ? 변경할 내용 (카테고리)
      {
        where: { id: req.body.id } //! 카테고리 테이블의 id 값을 찾아서 변경 한다. 
      }
    )
      .then(data => {
        res.status(201).send(data); // ? [0]은 수정안됨(이미 같은게 있음),   [1]은 수정됨
        //     console.log("변경성공, 카테고리 이름은:", data.dataValues.category);
      })
      .catch(err => {
        console.error(err);
      });
  },

    // TODO: 카테고리 삭제. 같은 이름의 카테고리가 있다면 삭제 -> 카테고리를 삭제하면 덱, 카드 도 같이 삭제 되어야한다..
    delete: (req, res) => {
      Category.destroy({ where: { id : req.body.id } })  
        .then(data => {
          res.json(data); // Todo: 제거 후의 클라이언트에서의 데이터 상태 봐서 보내줄 부분 추가
        })
        .catch(err => {
          console.error(err);
        });
    }

};
