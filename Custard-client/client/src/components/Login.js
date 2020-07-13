import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../config/googleClientId";
import axios from "axios";
//import google_logo from "../google_logo.png";
import google_logo_2 from "../google_logo_2.png";
import "../styles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tempToken: "",
      needSignUp: false,
    };
  }

  render() {
    if (this.props.isLogin) {
      return <Redirect to="/mypage" />; //!mypage
    }
    if (this.state.needSignUp) {
      return <Redirect to="/signup" />;
    }
    return (
      <div className="login" style={{ padding: "40px 0 0 0" }}>
        <GoogleLogin
          clientId="FIX_ME" //-> google access token -> Custard server에 전송
          //custard server는 google access token
          //구글 로그인 아이콘 바꾸려면:
          render={(renderProps) => (
            <Button
              id="google-login-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img
                src={google_logo_2}
                className="google-logo"
                alt="google_login-logo"
              />
              Sign in with Google
            </Button>
          )}
          onSuccess={function (result) {
            // console.log(result);
            //* google login 할 때 localStorage에 프로필 사진 저장
            localStorage.setItem("profImg", result.profileObj.imageUrl);
            // console.log(result.profileObj.imageUrl);
            console.log(result.tokenObj["id_token"]);
            this.props.setTempToken(result.tokenObj["id_token"]);
            axios
              .post("http://15.165.162.24:4000/users/signin", {
                googleIdToken: result.tokenObj["id_token"],
              })
              .then((response) => {
                console.log("서버요청결과", response);
                console.log(response.data === "you need to signup");
                if (response.data === "you need to signup") {
                  this.setState({ needSignUp: true });
                } else if (response.status === 200) {
                  //console.log("code 200!");
                  console.log(response.data); //{username: "Min", image: "/account.png"}

                  localStorage.setItem("usertoken", response.data);
                  localStorage.removeItem(localStorage);
                  this.props.setLogin();
                  this.props.updateUserInfo(response.data);
                  return <Redirect to="/mypage" />;
                }
              });
          }.bind(this)}
          onFailure={(err) => console.log(err)}
        />
      </div>
    );
  }
}
export default withRouter(Login);
