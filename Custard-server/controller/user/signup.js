const { User } = require("../../models");
const bcrypt = require("bcrypt");


//console.log(User);

//TODO: 유저 등록 부분

module.exports = {
  post: (req, res) => {
    const today = new Date();
    const userInfo = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      // image : req.body.image,
      created_at: today
    };
    // 이메일로 찾는다.
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(data => {
        console.log(data, "signup_data");
        if (!data) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userInfo.password = hash;
            User.create(userInfo)
              .then(user => {
                res.json({ status: user.email + "등록되었습니다." });
              })
              .catch(err => {
                console.error(err);
                res.send("에러: " + err);
              });
          });
        } else {
          res.status(409).json({ error: "이미 존재하는 유저입니다." });
        }
      })
      .catch(err => {
        console.error(err);
        res.send("에러: " + err);
      });
  },

  //* 이메일 체크 할 때, 보내줄 디비에 저장되어 있는 데이터
  get: (req, res) => {
    User.findAll({}).then(data => {
      res.json(data);
    });
  }
};
