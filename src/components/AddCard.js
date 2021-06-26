import React, { useState } from "react";
import AddFileType from "./selectMenu/AddFileType";

// import CSV from "./fileType/FileUploader_csv";
// import Image from "./fileType/FileUploader_image";
import PlainText from "./fileType/PlainText";
import JSON from "./fileType/FileUploader_json";
import DetectText from "./fileType/Detect_text_image";

import "../styles/AddCard.css";

import database from "../firebase";

export default function AddCard(props) {
  let [fileType, setFileType] = useState("plain text");
  let [cardData, setCardData] = useState([]);

  const { category, deck } = props.match.params;

  function handleFileTypeChange(fileType) {
    setFileType(fileType);
  }

  //* JSON 타입 데이터 처리 함수
  function handleJSON(jsonData) {
    setCardData(jsonData);
  }

  //* OCR 데이터 처리 함수
  function handleDetect(imageText) {
    //TODO: OCR 결과값 카드 입력창에 적용
    console.log(imageText);
  }

  //* 카드 등록
  function registerCard(cards) {
    let cardRef = database.ref("cards").child(category).child(deck);

    cards.forEach((card) => {
      cardRef
        .push({ cards: card })
        .then(() => {
          console.log(card);
        })
        .catch((err) => alert("Error: ", err));
    });
  }

  return (
    <div className="AddCard">
      <AddFileType handleFileTypeChange={handleFileTypeChange} />

      {(() => {
        switch (fileType) {
          case "plain text":
            return (
              <div>
                <PlainText
                  // category={category}
                  deck={deck}
                  registerCard={registerCard}
                />
              </div>
            );
          // case "table":
          //   return (
          //     <div>
          //       {/* <div className="filler"></div>
          //           <CSV
          //             handleCSV={this.handleCSV}
          //             handleTable={this.handleTable}
          //           />
          //           <div className="add-cardform-button">
          //             <AddBoxIcon onClick={this.addCardForm.bind(this)} />
          //           </div> */}
          //       <PlainText category={category} deck={deck} />
          //     </div>
          //   );
          case "json":
            return (
              <div>
                <JSON handleJSON={handleJSON} />
                <br></br>
                <PlainText
                  category={category}
                  deck={deck}
                  cardData={cardData}
                />
              </div>
            );
          case "image":
            return (
              <div>
                {/* <Image handleImage={this.handleImage} />
                <div className="add-cardform-button">
                  <AddBoxIcon onClick={this.addCardForm.bind(this)} />
                </div> */}
                <PlainText category={category} deck={deck} />
              </div>
            );
          case "text recognition":
            return (
              <div>
                <DetectText handleDetect={handleDetect} />
                <PlainText category={category} deck={deck} />
              </div>
            );
        }
      })()}
      {/* <div>
      //   {
      //     <Button
      //       id="add-card-button"
      //       onClick={this.handleInputReset.bind(this)}
      //     >
      //       Add Card
      //     </Button>
      //   }
      // </div> */}
    </div>
  );
}
