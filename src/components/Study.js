import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Bookmark from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import Flashcard from "../containers/Flashcard";
import Blank from "../containers/Blank";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";

import "../styles/Study.css";

export default class Study extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarked: false,
    };
    this.handleMarkedTrue = this.handleMarkedTrue.bind(this);
    this.handleMarkedFalse = this.handleMarkedFalse.bind(this);
  }

  componentDidMount() {
    this.props.updateUserDecks(this.props.userId /**/);
    this.props.getDeckCards();
  }

  handleMarkedTrue() {
    this.setState({ isMarked: true });
  }

  handleMarkedFalse() {
    this.setState({ isMarked: false });
  }

  render() {
    const { cards, category } = this.props;
    const { cate_route, title, cardId } = this.props.match.params;
    const { handleHintedPost } = this.props;

    //? decks => category[i].Decks
    let currentDeckId = 0;
    let deckTitle = "";
    for (let i = 0; i < category.length; i++) {
      for (let j = 0; j < category[i].Decks.length; j++) {
        let currentDeck = "";
        if (category[i].Decks[j].title === title) {
          currentDeckId = category[i].Decks[j].id;
          currentDeck = category[i].Decks[j].title;
          deckTitle = category[i].Decks[j].title;
        }
      }
    }
    const cardIdArr = [];

    for (let i = 0; i < cards.length; i++) {
      console.log(typeof cards[i]["deck_id"]);
      if (cards[i]["deck_id"] === currentDeckId) {
        cardIdArr.push(cards[i].id);
      }
    }
    //console.log(deckTitle);
    //console.log(cardIdArr);
    const currentIdx = cardIdArr.indexOf(parseInt(cardId));
    return (
      <div id="study-container">
        <Grid container spacing={1} className="study_container">
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            alignItems="flex-start"
            className="study_content"
          >
            <Card variant="contained">
              <Tooltip title="bookmark" placement="right">
                <CardHeader
                  title="Study"
                  subheader={deckTitle}
                  action={
                    !this.state.isMarked ? (
                      <Bookmark
                        style={{ float: "right" }}
                        onClick={() => {
                          this.props.handleMarkedInServer(cardId);
                          this.props.getDeckCards();
                          this.setState({ isMarked: true });
                        }}
                      />
                    ) : (
                      <BookmarkIcon
                        style={{ float: "right" }}
                        onClick={() => {
                          //TODO: 서버에 다시 요청보내는 함수 필요
                          // this.props.handleMarkedInServer(cardId);
                          // this.props.getDeckCards();
                          this.setState({ isMarked: false });
                        }}
                      />
                    )
                  }
                />
              </Tooltip>
              <CardContent>
                {cards.map(
                  function (card) {
                    if (
                      card["deck_id"] === currentDeckId &&
                      card.id === parseInt(cardId)
                    ) {
                      if (card.cardtype === "flashcard") {
                        return (
                          <Flashcard
                            cardId={card.id}
                            handleCorrectAnswer={this.props.handleCorrectAnswer}
                            handleCorrectInServer={
                              this.props.handleCorrectInServer
                            }
                            handleCorrectScore={this.props.handleCorrectScore}
                            handleWrongAnswer={this.props.handleWrongAnswer}
                            handleWrongInServer={this.props.handleWrongInServer}
                            handleWrongScore={this.props.handleWrongScore}
                            handleHintedInServer={
                              this.props.handleHintedInServer
                            }
                            handleHintedPost={handleHintedPost}
                            // hintedInStore={this.props.hintedInStore}
                          />
                        );
                      } else if (card.cardtype === "fill-in-the-blank") {
                        return (
                          <Blank
                            cardId={card.id}
                            handleCorrectAnswer={this.props.handleCorrectAnswer}
                            handleCorrectInServer={
                              this.props.handleCorrectInServer
                            }
                            handleCorrectScore={this.props.handleCorrectScore}
                            handleWrongAnswer={this.props.handleWrongAnswer}
                            handleWrongInServer={this.props.handleWrongInServer}
                            handleWrongScore={this.props.handleWrongScore}
                            handleHintedInServer={
                              this.props.handleHintedInServer
                            }
                            handleHintedPost={this.props.handleHintedPost}
                          />
                        );
                      }
                    }
                  }.bind(this)
                )}
              </CardContent>
              <CardActions>
                {currentIdx === 0 ? (
                  <Link
                    component={RouterLink}
                    to={`/deck/${cate_route}/${title}`}
                  >
                    <Button className="study_button" variant="outlined">
                      Back to Deck
                    </Button>
                  </Link>
                ) : (
                  <Link
                    component={RouterLink}
                    to={`/study/${cate_route}/${title}/${
                      cardIdArr[currentIdx - 1]
                    }`}
                  >
                    <Button className="study_button" variant="outlined">
                      previous card
                    </Button>
                  </Link>
                )}
                {currentIdx === cardIdArr.length - 1 ? (
                  // <Link component={RouterLink} to={`/score/${category}/${title}`}>
                  <Link
                    component={RouterLink}
                    to={{
                      pathname: `/score/${cate_route}/${title}`,
                      state: {
                        cards: cards,
                        currentDeckId: currentDeckId,
                      },
                    }}
                  >
                    <Button className="study_button" variant="outlined">
                      finish
                    </Button>
                  </Link>
                ) : (
                  <Link
                    component={RouterLink}
                    to={`/study/${cate_route}/${title}/${
                      cardIdArr[currentIdx + 1]
                    }`}
                  >
                    <Button className="study_button" variant="outlined">
                      next card
                    </Button>
                  </Link>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
