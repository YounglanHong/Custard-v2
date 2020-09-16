import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import LLN_logo from "../../images/LLN_logo.png";

import "../../styles/AddFileType.css";

export default function AddFileType({ handleFileTypeChange }) {
  //* AddCard- import file: file_type(바깥쪽 메뉴)
  //* file_type에 따라 화면 변화
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileType, setFileType] = useState("Select FileType");

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setFileType(e.target.innerText);
    handleFileTypeChange(e.target.innerText);
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="AddFileType">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="outlined"
        >
          {fileType}&nbsp;
          <KeyboardArrowDownIcon />
        </Button>

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
          <MenuItem onClick={handleClose}>text recognition</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
