import React from "react";
import Login from "../../containers/Login";

export default function LoginRoot({ isLogin, handleLogin }) {
  return (
    <div>
      <Login isLogin={isLogin} handleLogin={handleLogin} />
    </div>
  );
}
