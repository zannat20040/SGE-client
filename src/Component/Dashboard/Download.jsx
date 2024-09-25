/* eslint-disable react/prop-types */
import { Dialog } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import swal from "sweetalert";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export default function Download({ studentDetails, refetch }) {
  const [open, setOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null); 

  const handleOpen = (imgUrl) => {
    setSelectedFileUrl(imgUrl); 
    setOpen(!open); 
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file: ", error);
      swal("Opps!", "Error downloading file", "error");
    }
  };
  
  return (
    <div className="mt-5">
      <h2 className="text-lg font-semibold">Uploaded Files:</h2>
      {studentDetails.files.length > 0 ? (
        <ul className="mt-2">
          {studentDetails.files.map((file) => (
            <li
              key={file.public_id}
              className="flex justify-between items-center mb-2 p-2 pl-4 border rounded-md bg-gray-200 drop-shadow-sm"
            >
              <span>{file.filename}</span>
              <div className="flex justify-between gap-3 items-center">
                <button
                  onClick={() => handleOpen(file?.url)}
                  className="bg-black block btn rounded border-0"
                >
                  <IoEyeOutline className="text-lg text-white" />
                </button>
                <Dialog open={open} handler={() => setOpen(!open)}>
                  {selectedFileUrl && (
                    <img
                      src={selectedFileUrl}
                      alt="Preview may not be supported; please download."
                    />
                  )}
                </Dialog>
                <button
                  onClick={() => handleDownload(file?.url, file?.filename)}
                  className="btn bg-customPurple border-0 hover:text-customPurple rounded"
                >
                  <FaCloudDownloadAlt className="text-white text-lg" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
}
