import Login from "../components/Login";
import { connect } from "react-redux";
import {
  login,
  setLogin,
  updateUserInfo,
  setTempToken
} from "../actions/mypageActions";

//TODO: 얘 파일명 MypageContainer로 바꾸는거 안되는지 시도해보길 바람

function mapStateToProps(state) {
  return {
    isLogin: state.mypage.isLogin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTempToken: token => {
      dispatch(setTempToken(token));
    },
    setLogin: () => {
      dispatch(setLogin());
    },
    login: user => {
      dispatch(login(user));
    },
    updateUserInfo: data => {
      dispatch(updateUserInfo(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
