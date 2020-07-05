import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import LLN_logo from "../../LLN_logo.png";

import "../../styles/AddTextType.css";

// export default function AddCardMenu({ match }) {
export default function AddCardMenu(props) {
  //* AddCard- import file: file_type(바깥쪽 메뉴)
  //* file_type에 따라 화면 변화
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [textType, setTextType] = React.useState("Text Type");

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    //TODO: plain text가 선택 될때는 현재의 기본 addcard 화면에 머무름
    //TODO: 그 외 파일 불러오는 건 새로 component 만들어야
    //TODO: AddCardType과 마찬가지로 AddCard에서 props로 내려오는 addCardForm 함수 handleClose함수 내에서 실행시켜야
    setTextType(e.target.innerText);
    props.handleTextTypeChange(e.target.innerText);
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="file_type">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
        >
          {textType}&nbsp;
          <ArrowDropDownIcon />
        </Button>
        {/* 버튼 클릭 시 모달창(anchorEl가 true일 때는 open, false 일 때는
        close) */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>plain text</MenuItem>
          <MenuItem onClick={handleClose}>table</MenuItem>
          <MenuItem onClick={handleClose}>
            json
            <img
              alt="LLN-logo/"
              style={{ marginLeft: "58px", width: "28px", height: "28px" }}
              src={LLN_logo}
            />
          </MenuItem>
          {/*<MenuItem onClick={handleClose}>image</MenuItem>*/}
          <MenuItem onClick={handleClose}>text recognition</MenuItem>
          {/* <MenuItem onClick={handleClose}>jpeg</MenuItem>
          <MenuItem onClick={handleClose}>png</MenuItem>
          <MenuItem onClick={handleClose}>gif</MenuItem> */}
        </Menu>
      </div>
    </div>
  );
}
