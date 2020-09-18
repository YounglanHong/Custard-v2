import React, { Component } from "react";
import "../../styles/FileUploader_json.css";

export default class FileUploader_json extends Component {
  constructor(props) {
    super(props);
    this.handleJSONInput = this.handleJSONInput.bind(this);
  }

  handleJSONInput(e) {
    // e.preventDefault();
    //* input 태그를 이용해 선택한 파일의 결과로 반환된 FileList 객체의 0번째 인덱스 File
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      // console.log("JSON result:", reader.result);
      let parse = JSON.parse(reader.result); //* File => result object
      this.props.handleJSON(parse);
    };
    reader.readAsText(file);
  }

  render() {
    return (
      <div>
        <div id="custom-file-input-json-container">
          <form>
            <h3 className="json-heading">JSON File Upload</h3>
            <div className="json-notice">JSON 형식의 파일을 업로드 하세요</div>
            <input
              className="custom-file-input-json"
              type="file"
              name="jsonData"
              onChange={(e) => this.handleJSONInput(e)}
            />
          </form>
        </div>
      </div>
    );
  }
}
