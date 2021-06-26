import React from "react";
import Card from "../Card";

function Deck({ match }) {
  return (
    <div>
      <Card
        categoryTitle={match.params.category}
        deckTitle={match.params.deck}
      />
    </div>
  );
}
export default Deck;
