import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { FaCloudDownloadAlt } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { IoEyeOutline } from "react-icons/io5";
import { Dialog } from "@material-tailwind/react";

function FileUpload({ studentDetails, refetch }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null); // State to store selected file URL

  const handleOpen = (imgUrl) => {
    setSelectedFileUrl(imgUrl); // Store the specific file's URL
    setOpen(!open); // Toggle the dialog
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axiosPublic.post(
        `/mco/upload/${studentDetails?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      swal("Good job!", "File uploaded successfully", "success");
      setLoading(false);
      e.target.reset();
      refetch();
    } catch (error) {
      console.error("Error uploading file: ", error);
      swal("Opps!", "Error uploading file", "error");
      setLoading(false);
    }
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
    <div>
      {studentDetails && studentDetails?.canUpload ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex sm:flex-row flex-col justify-between items-center gap-2 pt-10"
          >
            <input
              required
              type="file"
              className="file-input file-input-bordered w-full rounded-md"
              onChange={handleFileChange}
            />

            <button
              type="submit"
              className="btn bg-[#2b3440] rounded-md font-normal text-white sm:w-fit w-full"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </>
      ) : (
        <p className="pt-8">You can not upload any file right now</p>
      )}
      <div className="mt-5">
        <h2 className="text-lg font-semibold">Uploaded Files:</h2>
        {studentDetails?.files?.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {studentDetails?.files?.map((file) => (
              <li
                key={file?.public_id}
                className="flex justify-between items-center  p-2 pl-4 border rounded-md bg-gray-200 drop-shadow-sm gap-2"
              >
                <span className="text-black overflow-x-hidden">
                  {file?.filename}
                </span>
                <div className="flex justify-between gap-3 items-center">
                  <button
                    onClick={() => handleOpen(file?.url)}
                    className="bg-black block btn rounded broder-0"
                  >
                    <IoEyeOutline className="text-lg text-white" />
                  </button>
                  <Dialog open={open} handler={() => setOpen(!open)}>
                    {selectedFileUrl && (
                      <img
                        src={selectedFileUrl}
                        alt="file might be not supported to show preview, please download"
                      />
                    )}{" "}
                  </Dialog>
                  <a
                    onClick={() => handleDownload(file?.url, file?.filename)}
                    className="btn bg-customPurple border-0 hover:text-customPurple rounded"
                  >
                    <FaCloudDownloadAlt className="text-white  text-lg" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
