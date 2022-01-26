import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const UPLOAD_FILE_STREAM = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

const TestUpload = () => {
  const [upload] = useMutation(UPLOAD_FILE_STREAM);
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(file);
    const res = await upload({ variables: { file: file } });
    console.log(res);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          id="myFile"
          name="filename"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input type="submit"></input>
      </form>
      <img
        src="https://authenticationappprofileimages.s3.amazonaws.com/img_039a0bb1-0a98-4c93-bfa9-72333382da2d"
        alt="test"
      ></img>
    </div>
  );
};

export default TestUpload;
