import React, { Component } from "react";
import { Button } from "@material-ui/core";
import * as firebase from "firebase/app";
import "firebase/auth";

import "../firebase";
import "../styles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.signInAnonymous = this.signInAnonymous.bind(this);
  }

  signInAnonymous() {
    firebase
      .auth()
      .signInAnonymously()
      .then((res) => {
        if (res.user.uid) {
          this.props.handleLogin();
        }
      })
      .catch((err) => {
        let errorCode = err.code;
        let errorMessage = err.message;
        alert(errorCode, ":", errorMessage);
      });
  }

  render() {
    return (
      <div className="login">
        <Button onClick={this.signInAnonymous}>
          <img
            className="anonymous"
            src="anonymous.png"
            title="SignIn Anonymously"
            alt="anonymous"
          />
        </Button>
        <div className="notice">익명 사용자로 로그인하세요</div>
      </div>
    );
  }
}
export default Login;
