const initialState = {
  id: 0,
  email: "",
  username: "stranger",
  isLogin: false, //true, //TODO: default값 false로 바꿔야함
  image: "",
  //"https://cookingwithdog.com/wp-content/uploads/2017/01/custard-pudding-00.jpg",
  token: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEMP_TOKEN":
      return Object.assign({}, state, { token: action.token });
    case "SET_LOGIN":
      return Object.assign({}, state, { isLogin: true });
    case "UPDATE_USER_INFO":
      console.log({
        id: action.userInfo.id,
        email: action.userInfo.email,
        username: action.userInfo.username,
        image: action.userInfo.image
      });
      return Object.assign({}, state, {
        id: action.userInfo.id,
        email: action.userInfo.email,
        username: action.userInfo.username,
        image: action.userInfo.image
      });
    case "SIGN_OUT":
      return Object.assign({}, state, { isLogin: false });
    default:
      return state;
  }
};

export default reducer;
