import Mypage from "../components/Mypage";
import { connect } from "react-redux";
import {
  setLogin,
  handleSignOut,
  signOutInStore,
} from "../actions/mypageActions";

//TODO: 얘 파일명 MypageContainer로 바꾸는거 안되는지 시도해보길 바람

const mapStateToProps = (state) => {
  return {
    mypage: state.mypage,
    isLogin: state.mypage.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: () => {
      dispatch(setLogin());
    },
    handleSignOut: () => {
      dispatch(handleSignOut());
    },
    signOutInStore: () => {
      dispatch(signOutInStore());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);
