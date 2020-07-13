const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");
// const { OAuth2Client } = require('google-auth-library');

// const dotenv = require('dotenv');
// dotenv.config();

module.exports = {
  post: (req, res) => {
    // 구글 토큰은 req.body에 붙여서 보내준다.
    let googleIdToken = req.body.googleIdToken;
    let clientEmail;
    // 구글 토큰이 유효한지 확인 한다.
    axios
      .get(`https://oauth2.googleapis.com/tokeninfo?id_token=${googleIdToken}`)
      .then((response) => {
        console.log("구글에 요청을 보내고 응답을 받음");
        if (response.status === 200) {
          // 구글토큰으로 이메일을 교환하고 교환한 이메일로 사용자 DB를 확인한다.
          clientEmail = response.data.email;
          User.findOne({
            where: {
              email: clientEmail,
            },
          })
            .then((data) => {
              console.log(`DB data: ${data}`);
              if (!data) {
                res.status(202).send("you need to signup"); // 가입되지 않은 회원
              } else {
                var token = jwt.sign({ id: data.dataValues.id }, "custard", {
                  expiresIn: "1d",
                  subject: "checkLogin",
                  issuer: "custard server",
                });

                res.send(token);
                // res.cookie("userId", token);
                // console.log(res.cookie.userId);
                // localStorage.setItem('userId', token);

                // var getValue = localStorage.getItem('userId');
                // console.log(getValue);
                res.status(200).json({
                  email: data.dataValues.email,
                  username: data.dataValues.username,
                  image: data.dataValues.image,
                  // score: data.dataValues.score,
                  // nickname: data.dataValues.nickname,
                  // profileImg: data.dataValues.profileImg,
                });
              }
            })
            .catch((err) => {
              res.send(404).send(err);
            });
        }
      });
  },
};
// const { User } = require("../../models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// //const secretKey = require("../../config/jwt");

// process.env.SECRET_KEY = "codestates";
// //TODO: 유저 로그인 부분

// // * User Token 생성 함수
// // getToken: function() {
// //     var token = jwt.sign({
// //         id: this.id
// //     }, secret);
// //     return token;
// // }

// module.exports = {
//   post: (req, res) => {
//     // 이메일로 찾는다.
//     User.findOne({
//       where: {
//         email: req.body.email
//       }
//     })
//       .then(data => {
//         console.log(data.dataValues.email, "저장되어 있는 유저정보-이메일");
//         // ! 전략 , 이미지만 토큰의 영향을 주지 않게 하여 자유롭게 바뀌게 한다.
//         if (data) {
//           // 이미지가 아닐
//           //?bcrypt 의 compareSync함수를 사용해서 저장된 hash와 입력받은 password의 hash가 일치하는지 확인
//           if (bcrypt.compareSync(req.body.password, data.password)) {
//             let token = jwt.sign(
//               {
//                 id: data.dataValues.id,
//                 email: data.dataValues.email,
//                 username: data.dataValues.username
//               },
//               process.env.SECRET_KEY,
//               {
//                 expiresIn: "1d" // 1일 유효하도록 설정
//               }
//             );
//             res.send(token);
//           }
//         } else {
//           res.status(400).json({ error: "가입되지 않은 유저입니다." });
//         }
//       })
//       .catch(err => {
//         res.status(400).json({ error: err });
//       });
//   }
// };
