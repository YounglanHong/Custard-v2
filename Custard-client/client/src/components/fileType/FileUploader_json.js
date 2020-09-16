import React from "react";
// import axios, { post } from "axios";
import "../../styles/FileUploader_json.css";

export default class FileUploader_json extends React.Component {
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
      console.log("JSON result:", reader.result);
      let parse = JSON.parse(reader.result); //* File => result object
      this.props.handleJSON(parse);
    };
    reader.readAsText(file);
    // this.props.handleJSON(reader.result);
  }

  render() {
    return (
      <div /*className="container"*/>
        <div id="custom-file-input-json-container" /*className="row"*/>
          <form>
            {/* <h3>JSON File Upload</h3> */}
            <input
              className="custom-file-input-json"
              type="file"
              name="jsonData"
              onChange={(e) => this.handleJSONInput(e)}
              // onChange={this.handleJSONInput}
            />
            {/* <div>
              <button type="button" onClick={this.handlePost}>
                json
              </button>
            </div> */}
          </form>
        </div>
      </div>
    );
  }
}
