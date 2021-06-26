import React, { Component } from "react";
import { Button } from "@material-ui/core";

import * as firebase from "firebase/app";
import "firebase/auth";
import "../firebase";

import "../styles/Mypage.css";

export default class Mypage extends Component {
  constructor(props) {
    super(props);

    this.signOutAnonymous = this.signOutAnonymous.bind(this);
  }

  signOutAnonymous() {
    let user = firebase.auth().currentUser;
    if (user) {
      user
        .delete()
        .then(() => this.props.handleSignout())
        .catch((err) => {
          alert(err);
        });
    }
  }

  render() {
    return (
      <div className="mypage">
        <div className="welcome">Hello, test user!</div>
        <div className="profile">
          <img src="pudding.png" alt="profile_image" />
        </div>
        <Button
          className="signout"
          variant="outlined"
          onClick={this.signOutAnonymous}
          style={{
            color: "white",
            backgroundColor: "rgb(138, 136, 136)",
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }
}
