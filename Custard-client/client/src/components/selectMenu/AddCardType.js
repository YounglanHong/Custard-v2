import React from "react";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export default function AddCardType(props) {
  //* AddCard - card type: card_type(안쪽 메뉴)
  console.log(props);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cardtype, setCardType] = React.useState("Card Type");
  //* card_type에 따라 state 변화하고, 서버에 post 요청 시 다르게 보냄

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setCardType(e.target.innerText);
    props.handleCardTypeChange(props.idx, e.target.innerText);
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="card_type">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
        >
          {cardtype} &nbsp;
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(e) => {
              handleClose(e);
            }}
          >
            flashcard
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose(e);
            }}
          >
            fill-in-the-blank
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
