import React from "react";

export default function CommunicationDetails({ studentDetails }) {
  return (
    <div className="p-2 ">
      {studentDetails &&
      studentDetails?.universityCommunication?.length == 0 ? (
        <p className="text-center">
          You don't have any communication with university
        </p>
      ) : (
        <div className="flex gap-2 flex-col">
          {studentDetails?.universityCommunication
            ?.slice()
            .reverse()
            .map((communication, index) => (
              <div
                className="  rounded-md w-full  border-2 border-gray-200"
                key={index}
              >
                <div className=" px-5 py-2 border-b border-gray-200  flex justify-between flex-wrap items-center">
                  <p className="font-semibold">{communication?.from}</p>

                  <p className="text-xs text-gray-600">{communication?.date}</p>
                </div>
                <div className="px-5 py-4">{communication?.subject}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
