import React from "react";

import Button from "@material-ui/core/Button";

import { Editor } from "@toast-ui/react-editor";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import "../../styles/FileUploader_csv.css";

/*
| | | |
| --- | --- | --- |
| 1 | highly | 대단히 |
| 2 | wage | 임금 |
| 3 | attire | (격식) 의복, 복장 |
| 4 | policy | 정책 |
| 5 | proficiency | 능숙 |
| 6 | otherwise | 그렇지 않으면 |
| 7 | habit | 습관 |
| 8 | enforce | 강제하다 |
| 9 | confidence | 자신감 |
*/

export default class FileUploader_csv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processedContents: "",
    };
    this.textEditorRef = React.createRef();
    this.fileRef = React.createRef();
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleForce = this.handleForce.bind(this);
    this.handleTextEditor = this.handleTextEditor.bind(this);
    this.onTextEdit = this.onTextEdit.bind(this);
  }

  handleFileUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    let contents = "";
    reader.onload = function (e) {
      contents = e.target.result;
      console.log("File contents: " + contents);
      if (file.name.split(".")[1].toLowerCase() === "csv") {
        let processedContents;
        for (let i = 0; i < contents.length; i++) {
          if (contents[i] === ",") {
            contents[i] = "|";
          }
        }
        //= contents.replace(",", "|");
        console.log(processedContents);
        this.setState({ processedContents: processedContents });
      }
    }.bind(this);

    reader.onerror = function (e) {
      console.error("File could not be read! Code " + e.target.error.code);
    };

    reader.readAsText(file);
    let processedContents = contents;
    // console.log(file.name.split("."));
    // console.log(file.name.split(".")[1].toLowerCase());
    // console.log(file.name.split(".")[1].toLowerCase() == "csv");
    // if (file.name.split(".")[1].toLowerCase() == "csv") {
    //   processedContents = contents.replace(",", "|");
    // }
    // console.log(processedContents);
    // this.setState({ processedContents: processedContents });
  }

  handleForce = (csvData) => {
    console.log(csvData);
    // console.log(csvData.length);
    // for (let i = 1; i < csvData.length; i++) {
    //   this.props.handleCSV(csvData[i]);
    // }
    let rowArr = [];
    for (let i = 0; i < csvData.length; i++) {
      rowArr.push(csvData[i].join("|"));
    }
    const processedContents = rowArr.join("\n");
    console.log(processedContents);
    //this.setState({processedContents})
    this.props.handleCSV(csvData); //TODO: 복수의 카드 추가 가능하도록 작업(현재는 하나의 카드만 추가 가능)
    this.setState({ processedContents: processedContents });
  };

  handleTextEditor() {
    // const markdown = this.textEditorRef.current.getInstance().getMarkdown();
    // console.log(markdown);
    const htmlString = this.textEditorRef.current.getInstance().getHtml();
    //console.log(typeof html); //string
    //console.log(htmlString);
    /*
  <table>
    <thead>
      <tr>
      <th>question</th>
      <th>answer</th>
      <th>note</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>코로나</td>
        <td>corona</td>
        <td>health</td>
      </tr>
    <tr>
      <td><br data-tomark-pass=""></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>question</td>
      <td>answer</td>
      <td>note</td>
    </tr>
    <tr>
      <td>--------</td>
      <td>------</td>
      <td>----</td>
    </tr>
    <tr>
      <td>바이러스</td>
      <td>virus</td>
      <td>health</td>
    </tr>
    <tr>
    <td><br data-tomark-pass=""></td>
    <td></td>
    <td></td>
    </tr>
    <tr>
    <td>question</td>
    <td>answer</td>
    <td>note</td>
    </tr>
    <tr>
    <td>--------</td>
    <td>------</td>
    <td>----</td>
    </tr>
    <tr>
    <td>위험</td>
    <td>danger</td>
    <td>public health</td>
    </tr>
    </tbody>
  </table>
    */
    const parser = new DOMParser();
    let htmlTable = parser.parseFromString(
      htmlString,
      "text/html" /*"text/xml"*/
    );
    const rowArr = htmlTable.getElementsByTagName("tr");
    //console.log(htmlTable);
    //console.log(rowArr); //HTMLCollection(6) [tr, tr, tr, tr, tr, tr]
    const tableElArr = [];
    const thIdxArr = [0]; //[0, 3]
    for (let i = 1; i < rowArr.length; i++) {
      if (rowArr[i].innerText.includes("answer")) {
        //TODO: answer column은 반드시 있어야한다고 알려줘야함. (e,g, 모달창, help)
        thIdxArr.push(i);
        tableElArr.push([]);
        for (
          let j = thIdxArr[thIdxArr.length - 2];
          j < thIdxArr[thIdxArr.length - 1];
          j++
        ) {
          if (rowArr[j].innerText) {
            tableElArr[tableElArr.length - 1].push(rowArr[j]);
          }
        }
      }
    }
    tableElArr.push([]);
    for (let i = thIdxArr[thIdxArr.length - 1]; i < rowArr.length; i++) {
      tableElArr[tableElArr.length - 1].push(rowArr[i]);
    }
    //console.log(thIdxArr);
    //console.log(tableElArr); // [Array(3), Array(3)] 각각 세개의 tr이 들어있는 array.
    const contentArr = [];
    for (let i = 0; i < tableElArr.length; i++) {
      //console.log(tableArr[i]); [tr, tr, tr]
      const tableArr = [];
      for (let j = 0; j < tableElArr[i].length; j++) {
        //console.log(tableArr[i][j].cells); //[th, th, th] [td, td, td]
        const rowArr = [];
        for (let k = 0; k < tableElArr[i][j].cells.length; k++) {
          if (
            tableElArr[i][j].cells[k].innerText &&
            !(
              tableElArr[i][j].cells[k].innerText ===
              "-".repeat(tableElArr[i][j].cells[k].innerText.length)
            )
          ) {
            rowArr.push(tableElArr[i][j].cells[k].innerText);
          }
        }
        if (rowArr.length) {
          tableArr.push(rowArr);
        }
      }
      contentArr.push(tableArr);
    }
    //console.log(contentArr);
    this.props.handleTable(contentArr);
  }

  onTextEdit(text) {
    this.setState({ processedContents: text });
  }

  // papaparseOptions = {
  // header: false
  // dynamicTyping: true,
  // skipEmptyLines: true,
  // transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  // };

  render() {
    //? AddCard > CSV props
    //console.log(this.textEditorRef.current.getInstance().getMarkdown()); //null
    const instruction = `1. copy & paste table
    2. respectively name columns question, answer, target`;
    const template = `| question | answer | note |
| -------- | ------ | ---- |
|  |  |  |`;
    return (
      <div id="csv-container" className="file-uploader-csv">
        {/* //TODO: 파일 업로더 필요성? */}
        {/* <label htmlFor="file">upload table</label>
        <input
          ref={this.fileRef}
          onChange={this.handleFileUpload}
          name="file"
          type="file"
        ></input> */}
        {/* <button onClick={this.handleFileUpload}>process file</button> */}
        {/*<h3>CSV File Upload</h3>*/}
        {/*<CSVReader
          cssClass="react-csv-input"
          // label="Select CSV file"
          onFileLoaded={this.handleForce}
          // parserOptions={this.papaparseOptions}
        />*/}
        {/*<Button onClick={this.handleCSV}>csv</Button>*/}
        {/* //!원래는 기존 표에 바로 또 표를 덧붙일 수 있어야하는데 (toast ui 사용
        //!영상에도 나와 있음) 현재로서는 매번 새로운 표를 만들어야하는 불편함이
        //!있다. 왜그럴까? */}
        <Editor
          id="text-editor"
          ref={this.textEditorRef}
          className="tui-text-editor"
          initialValue={template}
          value={this.state.processedContents}
          previewStyle="tab"
          width={600}
          height="600px"
          initialEditType="wysiwyg" // "markdown"
          useCommandShortcut={true}
          usageStatistics={false}
          //추후 기능 추가에 맞춰 text editor의 toolbar 아이콘도 다시 추가
          //custom toolbar button: https://nhn.github.io/tui.editor/latest/tutorial-example19-customizing-toolbar-buttons
          toolbarItems={["table"]}
        />
        <Button id="generate-card-button" onClick={this.handleTextEditor}>
          generate card(s)
        </Button>
        {/*
        <TextEditor
          processedContents={this.state.processedContents}
          onTextEdit={this.onTextEdit}
          className="tui-text-editor"
        />
        */}
      </div>
    );
  }
}
