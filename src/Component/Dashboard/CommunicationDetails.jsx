import React from "react";

export default function CommunicationDetails({ studentDetails, refetch }) {
  return (
    <div className="p-2 ">
      <div className="  rounded-md w-full  border-2 border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200  flex justify-between flex-wrap md:items-center items-start">
          <p>University</p>

          <p className="text-xs">time & date</p>
        </div>
        <div className="px-5 py-4">Subject</div>
      </div>
    </div>
  );
}
