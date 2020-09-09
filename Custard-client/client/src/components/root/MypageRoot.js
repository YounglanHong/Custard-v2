import React from "react";
import Mypage from "../../containers/Mypage";

export default function MypageRoot({ isLogin, handleSignout }) {
  return (
    <div>
      <Mypage isLogin={isLogin} handleSignout={handleSignout} />
    </div>
  );
}
