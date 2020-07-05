const express = require("express");
const router = express.Router();

const { userController } = require("../controller");

router.post("/signout", userController.signout.post);
router.post("/signup", userController.signup.post); //*회원가입
router.get("/signup", userController.signup.get); //* 회원가입시 이메일 체크를 위한(db에 저장된 데이터 보내주는 역할)

router.post("/signin", userController.login.post); //*   로그인
router.get("/profile", userController.profile.get); //*  프로필

module.exports = router;
