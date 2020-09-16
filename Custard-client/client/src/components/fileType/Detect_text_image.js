import React, { Component } from "react";
//import "./HomePage.css";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
//import Button from "react-bootstrap/Button";
import { createWorker } from "tesseract.js";
// import { Editor } from "@toast-ui/react-editor";
import SelectLanguage from "./SelectLanguage.js";
// import TextEditor from "./TextEditor";
import MultipleImageUpload from "./MultipleImageUpload";
import "../../styles/Detect_text_image.css";

const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
//const download = require("downloadjs");
const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
};

class Detect_text_image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileObj: [],
      fileArray: [],
      cardBin: [],
      currentImg: "",
      language: ["jpn", "eng"],
      ocr: "",
      imageSrc: "",
      OCRResult: "",
    };
    this.imageEditor = React.createRef();
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.discardFile = this.discardFile.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.displayFile = this.displayFile.bind(this);
    this.selectLang = this.selectLang.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.doOCR = this.doOCR.bind(this);
    //this.doOCRAll = this.doOCRAll.bind(this);
    this.handleDetect = this.handleDetect.bind(this);
    this.editOCRResult = this.editOCRResult.bind(this);
  }

  uploadMultipleFiles(e) {
    //console.log(e.target.files);
    const newFileObj = [...this.state.fileObj];
    for (let i = 0; i < e.target.files.length; i++) {
      newFileObj.push(e.target.files[i]);
    }
    this.setState({ fileObj: newFileObj });
    //this.fileObj.push(e.target.files);

    const newFileArray = [];
    for (let i = 0; i < newFileObj.length; i++) {
      newFileArray.push(URL.createObjectURL(newFileObj[i]));
    }
    this.setState({ fileArray: newFileArray });
  }

  handleCheck(i, e) {
    //console.log(i);
    const newCardBin = [...this.state.cardBin];
    if (e.target.checked) {
      newCardBin.push(i);
      //newCardBin.sort();
    } else {
      for (let j = 0; j < newCardBin.length; i++) {
        if (newCardBin[j] === i) {
          newCardBin.splice(j, 1);
        }
      }
    }
    this.setState({ cardBin: newCardBin });
  }

  discardFile() {
    const oldFileObj = [...this.state.fileObj];
    const newFileObj = [];
    const newFileArray = [];
    //const fileBin = [];
    for (let i = 0; i < oldFileObj.length; i++) {
      if (this.state.cardBin.includes(i)) {
        oldFileObj[i] = null;
      }
    }
    for (let i = 0; i < oldFileObj.length; i++) {
      if (oldFileObj[i]) {
        newFileObj.push(oldFileObj[i]);
      }
    }
    for (let i = 0; i < newFileObj.length; i++) {
      newFileArray.push(URL.createObjectURL(newFileObj[i]));
    }
    this.setState({
      fileObj: newFileObj,
      fileArray: newFileArray,
      cardBin: [],
    });
  }

  selectFile(i, e) {
    //console.log(i);
    var file = this.state.fileObj[i];
    this.displayFile(file, i);
  }

  displayFile(file, i) {
    console.log(file);
    console.log(i);
    const imageEditorInst = this.imageEditor.current.getInstance();
    imageEditorInst.loadImageFromFile(file).then((result) => {
      console.log("display success");
      // console.log("old : " + result.oldWidth + ", " + result.oldHeight);
      // console.log("new : " + result.newWidth + ", " + result.newHeight);
    });
  }

  selectLang(langArr) {
    this.setState({ language: langArr });
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  saveChange() {
    const imageEditorInst = this.imageEditor.current.imageEditorInst;
    console.log(imageEditorInst);
    const fileName = imageEditorInst._graphics.imageName;
    const data = imageEditorInst.toDataURL();
    let file;
    if (data) {
      // const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      file = this.dataURLtoFile(data, `${fileName.split(".")[0]}.${extension}`);
    }
    console.log(file);
    const newFileObj = [...this.state.fileObj];
    const newFileArray = [...this.state.fileArray];
    for (let i = 0; i < newFileObj.length; i++) {
      if (newFileObj[i].name === fileName) {
        newFileObj[i] = file;
        newFileArray[i] = URL.createObjectURL(file);
      }
    }
    this.setState({ fileObj: newFileObj });
    this.setState({ fileArray: newFileArray });
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  //여기까지
  //TODO: create separate card / create one card 나눠야함
  doOCR = async () => {
    this.setState({ ocr: "Recognizing..." });
    let targetLang = "";
    if (this.state.language.length === 1) {
      targetLang = this.state.language[0];
    } else if (this.state.language.length > 1) {
      targetLang = this.state.language.join("+");
    }
    // let newOCR = "";
    const promises = this.state.fileObj.map(
      async function (fileObj, i) {
        if (this.state.cardBin.includes(i)) {
          const dataURL = await this.toBase64(fileObj);
          const worker = createWorker({
            logger: (m) => console.log(m),
          });
          await worker.load(); // loads tesseract.js-core scripts
          await worker.loadLanguage(targetLang);
          await worker.initialize(targetLang); // initializes the Tesseract API
          const {
            data: { text },
          } = await worker.recognize(dataURL);
          return text;
        }
      }.bind(this)
    );
    return Promise.all(promises)
      .then((res) => {
        //console.log(res); //배열
        this.setState({ OCRResult: res });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  handleDetect(imageText) {
    console.log("imageText_addCard: ", imageText);
    this.setState({ OCRResult: imageText });
  }

  editOCRResult(e) {
    this.setState({ OCRResult: e.target.value });
  }

  render() {
    //     const instruction = `1. copy & paste table
    //     2. respectively name columns question, answer, target`;
    //     const template = `| question | answer | note |
    // | -------- | ------ | ---- |
    // |  |  |  |`;
    //console.log(this.state.cardBin);
    //console.log(this.state.fileObj);
    // console.log(this.state.fileObj);
    // console.log(this.state.fileArray);
    //["blob:http://15.165.162.24:3000/a8984720-e245-4473-97ad-a729f87302a6", {...s}]
    return (
      <div>
        <div>
          <div id="image-editor">
            {/*<div className="center">*/}
            {/*<DeleteIcon onClick={this.discardFile} />*/}
            {/*<MultipleImageUpload
            fileArray={this.state.fileArray}
            uploadMultipleFiles={this.uploadMultipleFiles}
            handleCheck={this.handleCheck}
            selectFile={this.selectFile}
            displayFile={this.displayFile}
          />*/}
            {/*<button className="upload-button button" onClick={this.saveChange}>
            save change
        </button>*/}

            <ImageEditor
              //id="image-editor"
              ref={this.imageEditor}
              // {...imageEditorOptions}
              includeUI={{
                loadImage: {
                  path:
                    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", //this.state.imageSrc,
                  name: "Blank", //"image"
                },
                theme: myTheme,
                //sets the menu in the toolbar
                menu: [
                  "crop",
                  "flip",
                  "rotate",
                  "draw",
                  "shape",
                  "text",
                  "filter",
                ],
                //We set initMenu to an empty string so that it won’t show any dialog when user load the image
                initMenu: "",
                uiSize: {
                  height: `calc(100vh - 160px)`,
                },
                menuBarPosition: "top",
              }}
              //sets the size of the image editor
              cssMaxHeight={window.innerHeight}
              cssMaxWidth={window.innerWidth}
              selectionStyle={{
                cornerSize: 20,
                rotatingPointOffset: 70,
              }}
              usageStatistics={true}
            />
          </div>
          {/*<DeleteIcon onClick={this.discardFile} />*/}
          <div id="MultipleImageUpload">
            <MultipleImageUpload
              fileArray={this.state.fileArray}
              uploadMultipleFiles={this.uploadMultipleFiles}
              handleCheck={this.handleCheck}
              selectFile={this.selectFile}
              displayFile={this.displayFile}
            />
          </div>
          <div id="detect-text-filler"></div>
          <div id="OCR-tool">
            <button
              id="save-change"
              className="upload-button button"
              onClick={this.saveChange}
            >
              save change
            </button>
            <button
              id="detect-change"
              className="upload-button"
              onClick={this.doOCR}
            >
              detect selected item(s)
            </button>
          </div>
          <div id="select-language" style={{ display: "none" }}>
            <SelectLanguage selectLang={this.selectLang} />
          </div>
          <textarea
            id="OCR-result"
            onChange={this.editOCRResult}
            value={this.state.OCRResult}
            style={{
              //width: "100%",
              height: 250,
            }}
          ></textarea>
          {/*</div>*/}
        </div>
        {/*<div id="select-language">
          <SelectLanguage selectLang={this.selectLang} />
        </div>*/}
      </div>
    );
  }
}
export default Detect_text_image;

// import React from "react";
// import { createWorker } from "tesseract.js";
// // const axios = require("axios");

// class Detect_text_image extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//       ocr: "Upload Image"
//     };
//     this.onFormSubmit = this.onFormSubmit.bind(this);
//     this.onChange = this.onChange.bind(this);
//     this.doOCR = this.doOCR.bind(this);
//   }
//   // * tesseract.js-core
//   //? webWorker: 브라우저의 Main Thread 와 별개로 작동되는 Thread 를 생성
//   //? 브라우저 렌더링 같은 Main Thread 의 작업을 방해하지 않고, 새로운 Thread 에서 스크립트를 실행
//   // 브라우저의 리소스를 많이 사용해서 webWorker에서 동작/ 최초 인식 때 한번만 가져오고 이후부터는 캐시에서 불러옴
//   worker = createWorker({
//     logger: m => console.log(m)
//   });
//   onFormSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("myImage", this.state.image);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data"
//       }
//     };
//     // axios
//     //   .post("http://15.165.162.24:4000/card/cardInfo", formData, config)
//     //   .then(response => {
//     //     alert("The file is successfully uploaded");
//     //   })
//     //   .catch(error => {});
//   }
//   onChange(e) {
//     this.setState({ image: e.target.files[0] });
//   }

//   doOCR = async () => {
//     // console.log("image", this.state.image);
//     this.setState({ ocr: "Recognizing..." });
//     await this.worker.load(); // loads tesseract.js-core scripts
//     await this.worker.loadLanguage("eng");
//     await this.worker.initialize("eng"); // initializes the Tesseract API
//     const {
//       data: { text }
//     } = await this.worker.recognize(this.state.image);
//     this.setState({ ocr: text });
//     console.log("text", text);
//     this.props.handleDetect(text);
//   };

//   render() {
//     // console.log(this.state.file);
//     return (
//       <form onSubmit={this.onFormSubmit}>
//         <h3>Image File Upload to detect</h3>
//         <input type="file" name="detectImage" onChange={this.onChange} />
//         {/* <button type="submit">Upload</button> */}
//         <button onClick={this.doOCR}>detect</button>
//         <div>{this.state.ocr}</div>
//       </form>
//     );
//   }
// }

// export default Detect_text_image;
