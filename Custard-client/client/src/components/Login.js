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
          clientId={GOOGLE_CLIENT_ID} //-> google access token -> Custard server에 전송
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
            console.log(result);
            console.log(result.tokenObj["id_token"]);
            this.props.setTempToken(result.tokenObj["id_token"]);
            axios
              .post("http://localhost:4000/users/signin", {
                googleIdToken: result.tokenObj["id_token"],
              })
              .then((response) => {
                console.log("서버요청결과", response);
                /*
                {data: "you need to signup", status: 202, statusText: "Accepted", headers: {…}, config: {…}, …}
data: "you need to signup"
status: 202
statusText: "Accepted"
headers: {access-control-allow-credentials: "true", connection: "close", content-length: "18", content-type: "text/html; charset=utf-8", date: "Wed, 01 Apr 2020 13:19:57 GMT", …}
config: {url: "/users/signin", method: "post", data: "{"googleIdToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1…9f-0f1gG3Y5dfWaSU3mJTxs_dbGMOFoug5L-qIxC5p9uBJg"}", headers: {…}, transformRequest: Array(1), …}
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
__proto__: Object
                */
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
            /*
            Zw {Ca: "101386552392099643900", uc: {…}, Rt: ax, googleId: "101386552392099643900", tokenObj: {…}, …}
Ca: "101386552392099643900"
uc: {token_type: "Bearer", access_token: "ya29.a0Ae4lvC37ZsFBdXsHP2ea1O1x5u9H6EQZl0GBObRDuSa…K1hbxOINNMAtKiWsUTMBsB53tNwaLF2gq_i9OAdZYewKbxDoQ", scope: "email profile https://www.googleapis.com/auth/user… https://www.googleapis.com/auth/userinfo.profile", login_hint: "AJDLj6JUa8yxXrhHdWRHIV0S13cAx9pMpsCRSWilRd-7p5opa-y4EpuypFAP8qT9NDOZdMUxGMev-rNblhXUWn1m80sING3beQ", expires_in: 3599, …}
Rt: ax {eV: "101386552392099643900", Ad: "Minkyung Lee", JW: "Minkyung", JU: "Lee", kL: "https://lh3.googleusercontent.com/-eFZZhTKQXao/AAA…AKWJJOunJP5oFTQBZsYzAjLl9UY8JpbJw/s96-c/photo.jpg", …}
googleId: "101386552392099643900"
tokenObj: {token_type: "Bearer", access_token: "ya29.a0Ae4lvC37ZsFBdXsHP2ea1O1x5u9H6EQZl0GBObRDuSa…K1hbxOINNMAtKiWsUTMBsB53tNwaLF2gq_i9OAdZYewKbxDoQ", scope: "email profile https://www.googleapis.com/auth/user… https://www.googleapis.com/auth/userinfo.profile", login_hint: "AJDLj6JUa8yxXrhHdWRHIV0S13cAx9pMpsCRSWilRd-7p5opa-y4EpuypFAP8qT9NDOZdMUxGMev-rNblhXUWn1m80sING3beQ", expires_in: 3599, …}
tokenId: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1N2Y2YTU4MjhkMWU0YTNhNmEwM2ZjZDFhMjQ2MWRiOTU5M2U2MjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjY3Nzc3MzQyMDAxLWExcjNkNHM2OGVxazI2cDIwcmJvM2YwanNvYWlkMXFrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjY3Nzc3MzQyMDAxLWExcjNkNHM2OGVxazI2cDIwcmJvM2YwanNvYWlkMXFrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAxMzg2NTUyMzkyMDk5NjQzOTAwIiwiZW1haWwiOiJnb29vZ3llb25nQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTmlHaXRtbm1GdllidDJJb2NBU1VKUSIsIm5hbWUiOiJNaW5reXVuZyBMZWUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1lRlpaaFRLUVhhby9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQUtXSkpPdW5KUDVvRlRRQlpzWXpBakxsOVVZOEpwYkp3L3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJNaW5reXVuZyIsImZhbWlseV9uYW1lIjoiTGVlIiwibG9jYWxlIjoia28iLCJpYXQiOjE1ODU3NDQ2MTUsImV4cCI6MTU4NTc0ODIxNSwianRpIjoiM2I1ODQ2OTUyNTA2Mzg0ZGUxZjBhM2M5MDBiOWRjMTE4ZmVhNTU3YyJ9.j_T1aGyAFv6Y7WxvmedXJCa3en-HJfLFjTusvqzNQG3fQ4gcwfe6o8kEeMzhwtpzZIMyJr8zk1oeNXZ5wa9wW1UV8cqG3vwUBpZfzBmrCGUgKtkMpnWbupOgZ2Px7iIHCCB94mAGbz2FP-o431m729lKVoDPPeN2pP4TlavCGJKU76M4S1dbYTVN5jgMkhzTn6px77e8wa0AZu_Ewmr-orX-M_FJUQXHDKBC8qZmEG0YrRBe7jKQ2R9rlWamxg8eRz7Dmco8ujlorhKbCFtjrhF3ZC40A6iy6HJlr07vmak1WaT4e3LqOqrf4Jkw1q957TvUaf3O810XbHckeOA0EQ"
accessToken: "ya29.a0Ae4lvC37ZsFBdXsHP2ea1O1x5u9H6EQZl0GBObRDuSae7ZAulGhu3ILvwpdGH96WavLF8iKf-21tDvf-80VpHJwTEXjuc0nT_Px7MNkV-Oo4_-2OuZK1hbxOINNMAtKiWsUTMBsB53tNwaLF2gq_i9OAdZYewKbxDoQ"
profileObj: {googleId: "101386552392099643900", imageUrl: "https://lh3.googleusercontent.com/-eFZZhTKQXao/AAA…AKWJJOunJP5oFTQBZsYzAjLl9UY8JpbJw/s96-c/photo.jpg", email: "gooogyeong@gmail.com", name: "Minkyung Lee", givenName: "Minkyung", …}
__proto__: Object
            */
            //this.props.requestLogin(result);
          }.bind(this)}
          onFailure={(err) => console.log(err)}
        />
        {/*<Link to="/signup">회원가입</Link>*/}
      </div>
    );
  }
}
export default withRouter(Login);
