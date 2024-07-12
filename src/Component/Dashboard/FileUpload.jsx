/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function FileUpload({ studentDetails, refetch }) {
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
      {studentDetails && studentDetails?.canUpload ? (
        <form
          onSubmit={handleSubmit}
          className="flex sm:flex-row flex-col justify-between items-center gap-2 pt-10"
        >
          <input
            type="file"
            className="file-input file-input-bordered w-full rounded-md"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="btn bg-black rounded-md font-normal text-white sm:w-fit w-full"
          >
            Upload
          </button>
        </form>
      ) : (
        <p className="pt-8">You can not upload any file right now</p>
      )}
    </div>
  );
}

export default FileUpload;
