import React, { Component } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import { createWorker } from "tesseract.js";
import SelectLanguage from "./SelectLanguage.js";
import MultipleImageUpload from "./MultipleImageUpload";

import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import "../../styles/Detect_text_image.css";

const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");

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
      progress: 0,
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
    this.handleDetect = this.handleDetect.bind(this);
    this.editOCRResult = this.editOCRResult.bind(this);
  }

  uploadMultipleFiles(e) {
    const newFileObj = [...this.state.fileObj];
    for (let i = 0; i < e.target.files.length; i++) {
      newFileObj.push(e.target.files[i]);
    }
    this.setState({ fileObj: newFileObj });

    const newFileArray = [];
    for (let i = 0; i < newFileObj.length; i++) {
      newFileArray.push(URL.createObjectURL(newFileObj[i]));
    }
    this.setState({ fileArray: newFileArray });
  }

  handleCheck(i, e) {
    const newCardBin = [...this.state.cardBin];
    if (e.target.checked) {
      newCardBin.push(i);
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
    var file = this.state.fileObj[i];
    this.displayFile(file, i);
  }

  displayFile(file, i) {
    console.log(file);
    console.log(i);
    const imageEditorInst = this.imageEditor.current.getInstance();
    imageEditorInst.loadImageFromFile(file).then((result) => {
      console.log("display success");
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

  //* 텍스트 감지 로딩바 %
  progressBar = (progress) => {
    this.setState({ progress: progress });
  };

  //TODO: create separate card / create one card
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
            logger: (m) => {
              this.progressBar(m.progress);
            },
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
        // console.log(res);
        this.setState({ OCRResult: res, progress: 0 });
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
    return (
      <div>
        <div>
          <div id="image-editor">
            <ImageEditor
              ref={this.imageEditor}
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
                  // width: "70%",
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

          <div id="MultipleImageUpload">
            <h3 className="detect-text-heading">Upload Image File</h3>
            <MultipleImageUpload
              fileArray={this.state.fileArray}
              uploadMultipleFiles={this.uploadMultipleFiles}
              handleCheck={this.handleCheck}
              selectFile={this.selectFile}
              displayFile={this.displayFile}
            />
            <div className="detect-text-notice">Select images to detect</div>
          </div>

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
            placeholder="Text Recognition Results"
            style={{
              //width: "100%",
              height: 250,
            }}
          />
          <div className="OCR-progressBar">
            {this.state.progress > 0 ? (
              <div>
                <CircularProgress />
                <div className="OCR-notice">Detecting text from images...</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/*<div id="select-language">
          <SelectLanguage selectLang={this.selectLang} />
        </div>*/}
      </div>
    );
  }
}
export default Detect_text_image;
