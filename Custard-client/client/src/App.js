import React, { Component } from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import MypageRoot from "./components/root/MypageRoot";
import LoginRoot from "./components/root/LoginRoot";
import Study from "./containers/Study";
import AllDeckList from "./containers/AllDeckList";
import Deck from "./containers/Deck";
import AddCard from "./containers/AddCard";
import Signup from "./containers/Signup";
import Score from "./containers/Score";

import { updateUserInfo } from "./actions/mypageActions";

import custard_logo_no from "./images/custard_logo_no.png";
import custard_logo_noo from "./images/custard_logo_noo.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNav: false,
      openModal: false,
      isLogin: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleMouseEnter() {
    this.setState({
      sideNav: true,
    });
  }
  handleMouseLeave() {
    this.setState({
      sideNav: false,
    });
  }

  handleOpen() {
    this.setState({
      openModal: true,
    });
  }

  handleClose() {
    this.setState({
      openModal: false,
    });
  }

  componentDidMount() {
    this.props.updateUserInfo();
  }

  handleLogin() {
    this.setState({ isLogin: true });
  }

  handleSignout() {
    this.setState({ isLogin: false });
  }

  render() {
    // const { isLogin } = this.props;
    const { isLogin } = this.state;
    const { handleLogin, handleSignout } = this;

    return (
      <div>
        {/* 로그인 상태에 따라 로고 이미지 변화 */}
        <div id="login-logo-container">
          <img
            alt="login-logo"
            className="login-logo"
            src={custard_logo_no}
            style={!isLogin ? { display: "none" } : {}}
          />
        </div>
        <div className="app">
          <div className="logout-logo-container">
            <img
              alt="logout-logo"
              className="logout-logo"
              src={custard_logo_noo}
              style={isLogin ? { display: "none" } : {}}
            />
          </div>

          <div
            id="mySidenav"
            className="sideNav"
            onMouseEnter={this.handleMouseEnter.bind(this)}
            onMouseLeave={this.handleMouseLeave.bind(this)}
            style={this.state.sideNav ? { width: 250 } : { width: 20 }}
          >
            <div className="navLink">
              <Link
                to="/mypage"
                style={!isLogin ? { pointerEvents: "none" } : {}}
              >
                Mypage
              </Link>
              <Link
                to="/decks"
                style={!isLogin ? { pointerEvents: "none" } : {}}
              >
                Decks
              </Link>
            </div>
          </div>
          <div className="app-content">
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  if (isLogin) {
                    return <Redirect to="/mypage" />;
                  } else {
                    return <Redirect to="/login" />;
                  }
                }}
              />
              <Route
                exact
                path="/login"
                // component={LoginRoot}
                render={() => (
                  <LoginRoot isLogin={isLogin} handleLogin={handleLogin} />
                )}
              />

              <Route
                exact
                path="/decks"
                render={() => {
                  if (isLogin) {
                    return <AllDeckList />;
                  } else {
                    return <Redirect to="/mypage" />;
                  }
                }}
              />
              <Route
                exact
                path="/signup"
                render={() => {
                  if (isLogin) {
                    return <Redirect to="/mypage" />;
                  } else {
                    return <Signup />;
                  }
                }}
              />
              <Route
                exact
                path="/mypage"
                render={() => {
                  if (isLogin) {
                    return (
                      <MypageRoot
                        isLogin={isLogin}
                        handleSignout={handleSignout}
                      />
                    );
                  } else {
                    return (
                      <LoginRoot isLogin={isLogin} handleLogin={handleLogin} />
                    );
                  }
                }}
              />
              {/* //? category => cate_route */}
              <Route
                exact
                // path="/deck"
                path="/deck/:cate_route/:title" //<-"/deck:title" //TODO: match.params.title
                component={Deck}
                render={() => {
                  if (isLogin) {
                    return <Deck />;
                  } else {
                    return <Deck />;
                  }
                }}
              />
              <Route
                exact
                path="/addCard/:cate_route/:title" //!어떤 deek에 카드를 추가하는지 알 수 있도록 router 추가했어요
                component={AddCard}
                render={() => {
                  if (isLogin) {
                    return <AddCard />;
                  } else {
                    return <AddCard />;
                  }
                }}
              />
              <Route
                exact
                path="/study/:cate_route/:title/:cardId" //TODO: url에 :cardId 이런식으로 들어가려면 각 카드에 id가 있어야하긴 하겠네요 ㅠ
                component={Study}
                render={() => {
                  if (isLogin) {
                    return <Study />;
                  } else {
                    return <Study />;
                  }
                }}
              />
              <Route
                exact
                path="/score/:cate_route/:title" //TODO: url에 :cardId 이런식으로 들어가려면 각 카드에 id가 있어야하긴 하겠네요 ㅠ
                component={Score}
                render={() => {
                  if (isLogin) {
                    return <Score />;
                  } else {
                    return <Score />;
                  }
                }}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.mypage.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: () => {
      dispatch(updateUserInfo());
    },
  };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
