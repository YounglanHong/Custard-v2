// import React from "react";
import axios from "axios";
// import LoginRoot from "../components/root/LoginRoot";

axios.defaults.withCredentials = true;
//axios.defaults.headers.common['authorization'] = token ;

export const SET_LOGIN = "SET_LOGIN";
export const SET_TEMP_TOKEN = "SET_TEMP_TOKEN";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const SIGN_OUT = "SIGN_OUT";

export function setTempToken(token) {
  return {
    type: SET_TEMP_TOKEN,
    token: token,
  };
}

export function register(newUser) {
  //TODO: dispatch 없애도!?
  return (dispatch) => {
    axios
      .post("http://localhost:4000/users/signup", {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      })
      .then((response) => {
        console.log("가입성공");
      });
  };
}

// ! 작동하는 함수
export function login(user) {
  return (dispatch) => {
    axios
      .post("users/signin", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("usertoken", response.data); // * 토큰 데이터를 로컬 스토리지에 저장, 세션스토리지에 해야하나..?
        console.log("로그인 성공", response.data);
        localStorage.removeItem(localStorage); //* 얘는 로그 아웃할 때 써먹어야할 것이다.
        // return response.data;
        dispatch(setLogin());
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function setLogin() {
  return {
    type: SET_LOGIN,
  };
}

export function addProfile(profile) {
  return (dispatch) => {
    //const url = 'http://localhost:4000/user/profile';
    const formData = new FormData();
    formData.append("image", profile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios
      .post("http://localhost:4000/users/profiles", formData, config)
      .then((res) => {
        console.log(res.data);
        dispatch(updateUserInfo()); //okkkk
      });
  };
}

export function updateUserInfo() {
  const token = localStorage.usertoken;
  //const decoded = jwt_decode(token);
  // console.log(decoded, "토큰 정보");
  // this.setState({
  //   id: decoded.id,
  //   username: decoded.username,
  //   email: decoded.email
  // });
  // this.userImageData(decoded)
  //   .then(res => this.setState({ image: res.data[0].image })) // ? 밑에 꺼랑 중복. 되는지 모르겠음. 안되면 제거.
  //   .catch(err => console.log(err));
  return (dispatch) => {
    axios
      .get("http://localhost:4000/users/profile", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data === "no token") {
          dispatch(signOutInStore());
        } else {
          dispatch(setLogin());
          dispatch(updateUserInfoInStore(res.data));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function updateUserInfoInStore(data) {
  return {
    type: UPDATE_USER_INFO,
    userInfo: data,
  };
  // return dispatch => {
  //   axios
  //   .get(/)
  // }
}

export function handleSignOut() {
  return (dispatch) => {
    // dispatch(setTempToken(result));
    axios.post("http://localhost:4000/users/signout").then(() => {
      dispatch(signOutInStore());
    });
  };
}

export function signOutInStore() {
  return {
    type: SIGN_OUT,
  };
}

// export function addCustomer(file) {
//   return () => {
//     const url = "http://localhost:4000/user/profile";
//     const formData = new FormData();
//     formData.append("image", file);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data"
//       }
//     };
//     return axios.post(url, formData, config).then(response => {
//       console.log(response.data); //okkkk
//     });
//   };
// }
