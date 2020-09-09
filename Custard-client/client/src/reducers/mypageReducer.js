const initialState = {
  id: 0,
  email: "",
  username: "test user",
  isLogin: false, //true, //TODO: default값 false로 바꿔야함
  image: "pudding.png",
  token: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEMP_TOKEN":
      return Object.assign({}, state, { token: action.token });
    case "SET_LOGIN":
      return Object.assign({}, state, { isLogin: true });
    case "SIGN_OUT":
      return Object.assign({}, state, { isLogin: false });
    default:
      return state;
  }
};

export default reducer;
