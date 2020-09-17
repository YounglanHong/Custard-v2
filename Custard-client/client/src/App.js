import React, { Component } from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import MypageRoot from "./components/root/MypageRoot";
import LoginRoot from "./components/root/LoginRoot";
import Category from "./components/Category";
import Deck from "./components/root/Deck";
import Study from "./components/Study";
import AddCard from "./components/AddCard";
import Signup from "./components/Signup";
import Score from "./components/Score";

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

  handleLogin() {
    this.setState({ isLogin: true });
  }

  handleSignout() {
    this.setState({ isLogin: false });
  }

  render() {
    const { isLogin } = this.state;
    const { handleLogin, handleSignout } = this;

    return (
      <div>
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
                render={() => (
                  <LoginRoot isLogin={isLogin} handleLogin={handleLogin} />
                )}
              />

              <Route
                exact
                path="/decks"
                render={() => {
                  if (isLogin) {
                    return <Category />;
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

              <Route exact path="/card/:category/:deck" component={Deck} />
              <Route
                exact
                path="/addCard/:category/:deck"
                component={AddCard}
              />
              <Route
                exact
                path="/study/:category/:deck/:cardId"
                component={Study}
              />
              <Route exact path="/score/:category/:deck" component={Score} />
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
