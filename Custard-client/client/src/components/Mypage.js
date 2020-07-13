import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import { patch } from "axios";
import { Button } from "@material-ui/core";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import { GoogleLogout } from "react-google-login";

import { GOOGLE_CLIENT_ID } from "../config/googleClientId";
import { signOutInStore } from "../actions/mypageActions";
import "../styles/Mypage.css";

export default class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      errors: {},
      fileObj: null,
      fileName: "파일을 선택하세요",
      image: " ",
      id: " ",
    };

    //console.log(props, "기존 props정보")
    // id: 1
    // username: "Min"
    // isLogin: false
    // profileURL: "https://cookingwithdog.com/wp-content/uploads/2017/01/custard-pudding-00.jpg"
    //* 이게 넘어오는데 쓸 수 있을까?
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleFileChange = this.handleFileChange.bind(this);

    this.plzImage = this.plzImage.bind(this);
    this.handleGoogleLogout = this.handleGoogleLogout.bind(this);

    //this.userImageData = this.userImageData.bind(this);
  }

  handleFileChange(e) {
    //console.log(e.target.files[0]);
    /*
    File {name: "why the long face.jpeg", lastModified: 1583198965864, lastModifiedDate: Tue Mar 03 2020 10:29:25 GMT+0900 (Korean Standard Time), webkitRelativePath: "", size: 5808, …}
    */
    //console.log(e.target.value); //C:\fakepath\why the long face.jpeg
    this.setState({
      fileObj: e.target.files[0],
      fileName: e.target.value,
    });
  }

  handleGoogleLogout() {
    // e.preventDefault();
    localStorage.removeItem("usertoken"); //* local storage remove item
    //alert("localstorage cleared!");
    this.props.signOutInStore();
  }

  componentDidMount() {
    this.props.updateUserInfo();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.plzImage();
  }

  // //* 일단 axios지만 형식에 맞게 다시 리팩토링 예정.
  // //* 자신 있는 분은 백업하시고 도전하세요 !!
  // //? 이미지 파일 업로드 요청하는 부분입니다. 디비에 디폴트로 저장된 이미지를 수정하는 것이기 때문에
  // //? patch를 주었습니다.  그리고 data 받아올 때 post를 이미 사용합니다 ^^
  // //? 이미지 파일(file)과 id값을 보냅니다.
  // plzImage() {
  //   //!  FormData 인터페이스의 append() 메서드는 FormData 객체의 기존 키에 새 값을 추가하거나, 키가 없는 경우 키를 추가합니다.
  //   //? MDN  https://developer.mozilla.org/ko/docs/Web/API/FormData/append
  plzImage() {
    //!  FormData 인터페이스의 append() 메서드는 FormData 객체의 기존 키에 새 값을 추가하거나, 키가 없는 경우 키를 추가합니다.
    //? MDN  https://developer.mozilla.org/ko/docs/Web/API/FormData/append

    const url = "15.165.162.24:4000/users/profiles";
    const formData = new FormData();
    formData.append("image", this.state.fileObj);
    formData.append("email", this.props.mypage.email);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config).then((res) => {
      console.log(res.data);
      //* Rows matched: 1  Changed: 1  Warnings: 0  보낸 파일에 대한 응답 (서버에서 저거 뜨면 적용이 잘 됩니다!)
      this.componentDidMount();
    });
  }

  render() {
    if (!this.props.mypage.isLogin) {
      return <Redirect to="/login" />;
    }
    //console.log(this.props);
    const { image /*, id*/ } = this.props.mypage;
    //console.log(this.state.fileObj);
    //console.log(this.state.fileName);

    const { mypage } = this.props;
    //* google login 할 때 localStorage에 저장한 프로필 사진 가져오기
    let profImg = localStorage.getItem("profImg");

    //let profileImg = `http://15.165.162.24:4000${this.props.mypage.image}`;
    return (
      <div className="mypage">
        <div className="welcome">Hello, {mypage.username}!</div>
        <div className="profile">
          <img
            src={profImg}
            // src={`http://15.165.162.24:4000${image}`}
            alt="profile"
            style={{
              width: 180,
              height: 180,
              borderRadius: "100%",
            }}
          />
        </div>
        {/* <form onSubmit={this.handleFormSubmit}>
          <div id="profile-uploader-container">
            <input
              className="custom-file-input"
              type="file"
              name="file"
              file={this.state.fileObj}
              onChange={this.handleFileChange.bind(this)}
            />
            <Button className="upload-button">Save</Button>
          </div>
        </form> */}

        <GoogleLogout
          clientId="FIX_ME"
          buttonText="Logout"
          onLogoutSuccess={this.handleGoogleLogout}
          render={(renderProps) => (
            <Button
              id="logout-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign out
            </Button>
          )}
        />
      </div>
    );
  }
}
