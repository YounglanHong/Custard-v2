const { User } = require("../../models");
const jwt = require("jsonwebtoken");

//TODO: 유저 프로필 화면 부분

module.exports = {
  get: (req, res) => {
    console.log(req.cookies, "쿠키를 찾아라~");
    const token = req.headers["authorization"];
    console.log(token, "내 소듕한 토큰값 ");
    if (!token) {
      res.send("no token");
    } else {
      // 토큰 확인
      // let token = req.cookies.userId;

      // let token = req.localStorage.getItem('userId');

      // console.log(token);
      var decode = jwt.verify(token, "custard");
      // console.log(decode);

      // 토큰이 유효하지 않은 경우 처리를 해야 한다.

      User.findOne({
        where: {
          id: decode.id,
        },
      })
        .then((data) => {
          // console.log(data);
          if (!data) {
            res.status(401).send("invalid user"); // 등록되지 않은 회원
          } else {
            res.status(200).json(data.dataValues);
          }
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    }
  },
  // get: (req, res) => {
  //   // 이메일로 찾는다.
  //   User.findOne({
  //     where: {
  //       id: decoded.id
  //     }
  //   })
  //     .then(data => {
  //       console.log(data, "data");
  //       if (data) {
  //         res.json(data);
  //       } else {
  //         res.send("존재하지 않는 유저입니다.");
  //       }
  //     })
  //     .catch(err => {
  //       res.send("에러 : " + err);
  //     });
  // }
};
