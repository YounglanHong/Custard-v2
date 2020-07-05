import React from "react";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export default function CardType(props) {
  //* Card - card type
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cardtype, setCardType] = React.useState("Card Type");

  console.log(cardtype);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    props.handleCardType(e.target.innerText);
    setAnchorEl(null);
    setCardType(e.target.innerText);
  };

  //? Card > CardType props
  //! cardtype만 바뀌어도 question, answer, hint 함께 서버에 patch/post 요청 보내는 문제
  return (
    <div>
      {/*console.log(props.values.cardtype)*/}
      <div className="card_type">
        {/* Card Type &nbsp; */}
        <Button
          //   aria-controls="simple-menu"
          //   aria-haspopup="true"
          onClick={handleClick}
          variant="outlined"
        >
          {props.values.cardtype}&nbsp;
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
              props.values.cardtype = e.target.innerText;
              props.editCardtype(props.values.cardtype, e.target.innerText);
              props.editCardInServer(
                props.values.id,
                props.values.cardtype,
                props.values.question,
                props.values.answer,
                props.values.answer_target,
                props.values.hint
              );
              props.editCard(props.values.id);
            }}
          >
            flashcard
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              handleClose(e);
              props.values.cardtype = e.target.innerText;
              props.editCardtype(props.values.cardtype, e.target.innerText);
              props.editCardInServer(
                props.values.id,
                props.values.cardtype,
                props.values.question,
                props.values.answer,
                props.values.answer_target,
                props.values.hint
              );
              props.editCard(props.values.id);
            }}
          >
            fill-in-the-blank
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
