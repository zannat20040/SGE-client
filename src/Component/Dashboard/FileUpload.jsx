/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function FileUpload({ studentDetails }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:5000/mco/upload/${studentDetails._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully: ", res.data);
      swal("Good job!", "File uploaded successfully", "success");
    } catch (error) {
      console.error("Error uploading file: ", error);
      swal("Opps!", "Error uploading file", "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
