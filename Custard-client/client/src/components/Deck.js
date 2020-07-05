import React from "react";
import Card from "./Card";

function Deck({ match }) {
  return (
    <div>
      <div>{match.params.title}</div>
      <Card />
    </div>
  );
}
export default Deck;
