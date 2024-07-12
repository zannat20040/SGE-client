/* eslint-disable react/prop-types */
import axios from "axios";
import swal from "sweetalert";

export default function Download({ studentDetails, refetch }) {
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
              className="flex justify-between items-center mb-2 p-2 border rounded-md bg-gray-200"
            >
              <span>{file.filename}</span>
              <a
                onClick={() => handleDownload(file.url, file.filename)}
                className="btn bg-blue-500 text-white rounded-md px-4 py-2"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
}
