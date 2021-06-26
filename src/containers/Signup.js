import Signup from "../components/Signup";
import { connect } from "react-redux";
import { register, updateUserInfo } from "../actions/mypageActions";

//TODO: 얘 파일명 SignupContainer로 바꾸는거 안되는지 시도해보길 바람

function mapStateToProps(state) {
  return {
    token: state.mypage.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: newUser => {
      dispatch(register(newUser));
    },
    updateUserInfo: () => {
      dispatch(updateUserInfo());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
