import React from "react";
import { Link } from "react-router-dom";

import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import CardType from "./selectMenu/CardType";
import CardField from "./field/CardField";

import "../styles/Card.css";

// handleCardType(cardType) {
//   this.setState({ cardType: cardType });
// }

export default function Card({ categoryTitle, deckTitle }) {
  return (
    <div id="Card">
      <div className="card_container">
        <header className="card_header">
          <h3>
            {categoryTitle}: {deckTitle}
          </h3>
          <Button id="card_study_button">Study</Button>
        </header>

        <div className="card_content">
          <div className="card_cardtype">
            <span>Card</span>
            {/* <CardType className="card_cardtype_button" /> */}
          </div>
          <div className="card_buttons">
            <Button type="submit">
              <Tooltip title="edit card" placement="left">
                <EditIcon style={{ fontSize: "13pt" }} />
              </Tooltip>
            </Button>
            <Button>
              <Tooltip title="delete card" placement="right">
                <DeleteIcon style={{ fontSize: "13pt" }} />
              </Tooltip>
            </Button>
          </div>
        </div>

        <Formik>
          <Form className="card_text">
            <CardField name="Question" />
            <CardField name="Answer" />
            <CardField name="Hint" />
          </Form>
        </Formik>
        <Button variant="outlined" style={{ marginLeft: "75%" }}>
          <Link
            className="addCard_link"
            to={`/addCard/${categoryTitle}/${deckTitle}`}
          >
            Add Card
          </Link>
        </Button>
      </div>
    </div>
  );
}
