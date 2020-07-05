import React from "react";
const axios = require("axios");

class ReactUploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:4000/card/cardInfo", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h3>Image File Upload</h3>
        <input type="file" name="myImage" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default ReactUploadImage;

// import React from "react";
// import ImageUploader from "react-images-upload";
// //* (ref: https://www.npmjs.com/package/react-images-upload)

// export default class FileUploader_image extends React.Component {
//   constructor(props) {
//     super(props);
//     // this.state = {
//     //   pictures: []
//     // };
//     this.state = {
//       images: []
//     };
//     this.onDrop = this.onDrop.bind(this);
//   }

//   onDrop(imageData) {
//     // setPictures([...pictures, picture]);
//     // const newPictures = [...this.state.pictures];
//     // newPictures.push({
//     //   pictures: picture
//     // });
//     // this.setState({ pictures: newPictures });
//     this.props.handleImage(imageData);
//     console.log(imageData);
//     this.setState({ images: imageData });
//   }

//   render() {
//     const { handleImage } = this.props;
//     return (
//       <div>
//         <h3>Image File Upload</h3>
//         <ImageUploader
//           // {...props}
//           withIcon={true}
//           withPreview={true}
//           onChange={this.onDrop}
//           imgExtension={[".jpg", ".gif", ".png"]}
//           maxFileSize={5242880}
//           fileSizeError="file size is too big"
//           fileTypeError="is not supported file extension"
//         />
//         <button onClick={handleImage}>image</button>
//       </div>
//     );
//   }
// }
