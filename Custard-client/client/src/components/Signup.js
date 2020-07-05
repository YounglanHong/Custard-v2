import React, { Component } from "react";
import axios from "axios";
import debounce from "lodash/debounce"; //* 이메일 인증 함수가 반복적으로 요청 되지 않기 하기 위한 라이브러리입니다.
import { Redirect } from "react-router-dom";
// import LoginRoot from "./root/LoginRoot";
// import { register } from "./UserFunctions";
import { Button } from "@material-ui/core";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", //*         유저이름
      isName: false, //*        이름 확인
      email: "", //*         이메일
      isEmail: false, //*        이메일 확인
      password: "", //*         비밀번호
      checkPassword: "", //*         비밀번호 확인
      errors: {},
      isSignup: false,
    };
    // this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  //* 이름 체크 하는 메서드
  //* username 필드에 새로운 값을 입력 할 때 마다 입력값이 인자로 전달.

  //* username이  두 글자 이상이면 유효하다
  checkedName = (username) => {
    if (username.length > 1) {
      this.setState({
        isName: true,
        username,
      });
    } else {
      this.setState({
        isName: false,
        username,
      });
    }
  };

  //* 이메일 체크 하는 메서드

  checkedEmail = debounce(async (email) => {
    const response = await axios.get("http://localhost:4000/users/signup");

    const users = response.data;
    const isUserFound = users.filter(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    ).length;

    isUserFound
      ? this.setState({
          email,
          isEmail: true,
        })
      : this.setState({
          email,
          isEmail: false,
        });
  }, 2000);
  // *함수 호출되에 0.3초 뒤에 실행하도록 설정 그 사이에 새로운 함수가 호출시, 기존 대기 시켰던 것 없애고 새로운 요청 대기
  //* 기존에는 한글자 타이핑 할 때마다 요청이 가서 서버 과부하 걸릴 수 있었는데, lodash 라이브러리를 이용 첫 타이핑이 끝난 후 요청이 가게 했다.
  //*  쉽게 말해 글자 입력 후 0.3초 뒤에 이미 있는지, 만들 수 있는 이메일인지에 대한 응답이 온다. (1초도 되고, 10초후에 반응 오게 할 수도 있다.)

  //? 이메일 등록 여부에 따라 보여주는 메시지
  emailFeedback() {
    if (this.state.email) {
      return this.state.isEmail ? (
        <div className="invalid-feedback">이미 등록되어 있는 이메일입니다</div>
      ) : (
        <div className="valid-feedback">사용할 수 있는 이메일입니다</div>
      );
    }
  }

  //* 패스워드 입력값 받아 state에 반영
  passwordInput(passwordInput) {
    this.setState({ password: passwordInput });
  }

  //* 패스워드 체크 값 입력 받아 반영
  checkPasswordInput(checkPasswordInput) {
    this.setState({ checkPassword: checkPasswordInput });
  }

  //? 패스워드 입력과 패스워드 체크 값이 일치하는 지 여부 확인
  passwordMatch() {
    const { password, checkPassword } = this.state;
    return password === checkPassword;
  }

  //? 패스워드와 패스워드체크 가 일치하지 않으면 보여주는 메시지
  passwordFeedback() {
    const { checkPassword } = this.state;

    if (checkPassword) {
      if (!this.passwordMatch()) {
        return (
          <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
        );
      }
    }
  }

  //* 회원가입시 보낼 데이터
  // ? 이미지의 경우에는 서버에서 이미지 컬럼의 디폴트 값으로 이미지를 주었습니다.
  onClick(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username, // * 이름
      email: this.state.email, // * 이메일
      //password: this.state.password // * 비밀번호
    };

    //console.log(newUser, "넘어간 유저정보"); //* 비밀번호까지 다 보이니 테스트 이후에는 삭제 바랍니다 ~~
    // console.log(this.props);
    // this.props.register(newUser);
    // .then(res => {
    //   //? 화살표 함수
    //   this.props.history.push(`/login`);
    // });
    return axios
      .post("http://localhost:4000/users/signup", {
        username: newUser.username,
        email: newUser.email,
        //password: newUser.password
        googleIdToken: this.props.token,
      })
      .then((res) => {
        console.log(res);
        this.setState({ isSignup: true });
      });
  }

  render() {
    if (this.state.isSignup) {
      return <Redirect to="/login" />;
    }
    // const { register } = this.props;
    // console.log(register);
    return (
      <div
        id="signup-container"
        style={{
          textAlign: "center",
          margin: "0 0 0 250px",
        }}
      >
        <div className="app">
          <div className="row">
            {/* <form noValidate onSubmit={this.onSubmit}> */}
            {/* <form noValidate> */}
            <form className="myForm">
              {/*<h1>Join Custard</h1>*/}

              <div className="form-group">
                <label htmlFor="name">User name </label>
                <input
                  type="text"
                  className=""
                  name="username"
                  id="nameInput"
                  placeholder="닉네임을 입력하세요"
                  // onChange={this.onChange}
                  onChange={(e) => this.checkedName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className=""
                  name="email"
                  placeholder="이메일을 입력하세요"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  onChange={(e) => this.checkedEmail(e.target.value)}
                  required
                />
                {this.emailFeedback()}
              </div>

              {/* <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input
                  type="password"
                  className=""
                  id="passwordInput"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={e => this.passwordInput(e.target.value)}
                  required
                />
              </div> */}

              {/* <div className="form-group">
              <label htmlFor="checkPasswordInput">패스워드 확인</label>
                <input
                  type="password"
                  className=""
                  id="checkPasswordInput"
                  placeholder="비밀번호를 입력하세요"        
                  onChange={e =>
                    this.checkPasswordInput(e.target.value)
                  }
                  required
                />
                 {this.passwordFeedback()}
              </div> */}
              <br></br>
              <Button onClick={this.onClick} className="">
                가입하기
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
