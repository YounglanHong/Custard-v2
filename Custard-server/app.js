const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const port = 4000;
const models = require("./models/index");

//const { shouldSendSameSiteNone } = require('should-send-same-site-none');
//app.use(shouldSendSameSiteNone);

const urlencode = require("urlencode"); // 인코딩 모듈
const fs = require("fs");
const multer = require("multer"); // *express에 multer모듈 적용 (for 파일업로드)

const upload = multer({ dest: "./upload" });
// *입력한 파일이 uploads/ 폴더 내에 저장된다.
// *multer라는 모듈이 함수라서 함수에 옵션을 줘서 실행을 시키면, 해당 함수는 미들웨어를 리턴한다.

const mysql = require("mysql");
const data = fs.readFileSync("./config/config.json");
const config = JSON.parse(data);
console.log(config, "app.js에 불러온 config.json정보입니다.");

const usersRouter = require("./routes/users"); //유저 관련 라우터...
const decksRouter = require("./routes/decks"); //덱 관련 라우터...
const cardsRouter = require("./routes/cards"); // 카드 관련 라우터..

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://15.165.162.24:3000",
      "http://custard.s3-website.ap-northeast-2.amazonaws.com",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/deck", decksRouter); // 덱 라우터 연결
app.use("/card", cardsRouter); // 카드 라우터 연결
app.use("/users", usersRouter); // 유저 라우터 연결

app.use("/image", express.static("./upload"));

//* mysql-sequelize 연결 부분
models.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).send("Success");
});

//* 이미지 전송을 받아 db에 적용시킬 쿼리를 위해 불러온 db데이터 입니다.
// {
//   "development": {
//     "username": "",
//     "password": "",
//     "database": "",
//     "host": "",
//   }
// }
//* 위 config.json의 내용을 참고 하셔서 밑의 내용을 알맞게 바꾸시면 됩니다.
//* 이게 싫으시면 주석처럼 작성하셔도 됩니다.

const connection = mysql.createConnection({
  host: config.development.host, //* host address
  user: config.development.username, //* "root"
  password: config.development.password, //* yourPassword
  port: 3306,
  database: config.development.database, //* yourDatabase
});

connection.connect();

//! 프로필 이미지 변경을 하고 싶으시면 건드리지 마세요 (관계자외 금지)
//! 자신있는 분들만 건드시고, 그 외에는 아무도!
//! 강아지나,.고양이도 건드리지 못하게 하세요
//? 특히 sql문은 건드리시면 큰일 납니당 ~~~~~~

//todo: 클라이언트의 mypage에서 user_id로 요청이 들어오면 user 테이블에 저장된 데이터중에
//todo: 요청된 id 값에 따른 이미지 데이터와 id값을 보냅니다.
//todo: 클라이언트에서는 이 데이터를 이용해서 유저별 이미지 변경요청을 할 수 있습니다.

app.post("/users/profiles", (req, res) => {
  console.log(req.body, "user테이블 id값: 들어오는 데이터-post 요청");
  let sql = `SELECT email, image From user WHERE email = ? `;
  let email = req.body.email;
  let params = email;
  // let id = req.body.id;
  // let params = id;

  connection.query(sql, params, (err, rows, fields) => {
    console.log(rows, "클라이언트로 보내질 id와 이미지 데이터 ");
    res.send(rows);
  });
});

//* 위에서 post요청에 따라서 클라이언트에 기존 저장된 이미지가 잘 나타나게 되면
//* 이 부분은 유저 id 값에 따라 디비에 저장된 이미지를 바꾸는 부분입니다.
//todo: 이미지와 user테이블의 id값을 받아서 맞는게 있으면 이미지가 업데이트 됩니다.
//todo: 업데이트된 이미지는 클라이언트에서 componentDidMount 에서 자동적으로 post요청이 가서 업데이트 된 데이터를 전송받습니다.

app.patch("/users/profiles", upload.single("image"), (req, res) => {
  console.log(req.body, "들어오는 데이터 app-patch요청");
  let sql = `UPDATE user SET image = ? where email = ?`;

  let image = "/image/" + req.file.filename;
  let email = req.body.email;
  let params = [image, email];

  connection.query(sql, params, (err, rows, fields) => {
    console.log(rows, "rows-patch");
    res.send(rows);
  });
});

app.set("port", port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
