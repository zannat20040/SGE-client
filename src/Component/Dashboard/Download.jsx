import React from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

export default function Download({ studentDetails, refetch }) {
  console.log(studentDetails);
  return (
    <div className="pt-8">
      <button className="btn btn-block flex justify-between bg-customPurple text-white rounded">
        <p className="font-normal text-sm"> Button</p>
        <IoCloudDownloadOutline className="text-lg" />
      </button>
    </div>
  );
}
