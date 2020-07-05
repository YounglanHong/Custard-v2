import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import FlareIcon from "@material-ui/icons/Flare";

import "../styles/Score.css";

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hintedClicked: false,
      markedClicked: false,
    };
  }
  handleHintedButton() {
    this.setState({ hintedClicked: true });
  }
  handleMarkedButton() {
    this.setState({ markedClicked: true });
  }

  render() {
    //? category => cate_route
    const { cate_route, title } = this.props.match.params;
    console.log(this.props.match.params);
    const { currentDeckId, cards } = this.props.location.state;
    console.log(this.props.location);

    let correctArr = [];
    let wrongArr = [];
    let hintedArr = [];
    let markedQArr = [];
    let correct;
    let wrong;
    let hinted;
    let idArray = [];
    let total = 0;
    // let deckTitle;
    cards.map((card) => {
      if (card.deck_id === currentDeckId) {
        correct = correctArr.push(card.correct);
        wrong = wrongArr.push(card.wrong);
        hinted = hintedArr.push(card.hinted);

        correct = correctArr.reduce((acc, curr) => {
          return acc + curr;
        });
        wrong = wrongArr.reduce((acc, curr) => {
          return acc + curr;
        });
        hinted = hintedArr.reduce((acc, curr) => {
          return acc + curr;
        });
        idArray.push(card.id);
        total = idArray.length;
        if (card.marked === true) {
          markedQArr.push(card.question);
        }
        console.log(markedQArr);
        console.log();
      }
    });
    console.log(correct, wrong, hinted);
    return (
      <div id="score">
        <div>
          <Grid container spacing={2} className="score_container">
            <Grid xs={12} sm={12} md={12} className="score_header">
              <h2>Deck Stats</h2>
            </Grid>
            <Grid xs={6} sm={6} md={6}>
              <List className="score_list">
                <ListItem>
                  <ListItemIcon>
                    <AddRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Correct: ${correct} / ${total}`} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <RemoveRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Wrong: ${wrong} / ${total}`} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <FlareIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Hinted: ${hinted} / ${total}`} />
                </ListItem>
              </List>
            </Grid>
            <Grid xs={12} sm={12} md={12} className="score_marked">
              {markedQArr.map((markedQ, i) => (
                <div>
                  <h4>Marked{i + 1}</h4>
                  {markedQ}
                </div>
              ))}
              <Divider />
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} md={12}>
              <Link component={RouterLink} to={`/deck/${cate_route}/${title}`}>
                <Button variant="outlined" className="score_button">
                  Back to Deck
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
