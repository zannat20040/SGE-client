import React from "react";
import useDateFormatter from "../../Hooks/useDateFormatter";
import StatusModal from "../StatusModal";
import useStatus from "../../Hooks/useStatus";
import Modal from "../Modal";

export default function StudentDetailsLayout({ studentDetails, refetch }) {
  // states
  const { formatDate } = useDateFormatter();
  const { userinfo } = useStatus();

  return (
    <div className="w-full py-5 flex flex-col gap-1 ">
      {/* status change for mco only */}
      {userinfo && userinfo === "mco" && (
        <div
          className={`flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1  sm:gap-4 flex-wrap items-center`}
        >
          <h1 className="font-semibold">Current Status: </h1>

          <div className="flex justify-end ">
            <Modal
              student={studentDetails}
              id={studentDetails?._id}
              refetch={refetch}
            />
          </div>
        </div>
      )}

      <div>
        {userinfo && userinfo === "member" && (
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1  sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Current Status: </h1>
            <button
              className={` text-customPurple font-semibold text-xs ${
                studentDetails?.status?.status === "application processing"
                  ? "text-orange-600 "
                  : studentDetails?.status?.status === "application submitted"
                  ? "text-cyan-600 "
                  : studentDetails?.status?.status === "dropout"
                  ? "text-red-600  "
                  : studentDetails?.status?.status === "enrollment"
                  ? " text-green-600"
                  : " text-customPurple"
              }    flex justify-end`}
            >
              {studentDetails?.status?.status}
            </button>
          </div>
        )}
      </div>

      {/* student details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-between items-start">
        {/* left-side ==>  */}
        <div>
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Student ID: </h1>
            <p className="flex justify-end">{studentDetails?._id}</p>
          </div>
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Student Name: </h1>
            <p className="flex justify-end">
              {studentDetails?.firstName + " " + studentDetails?.lastName}
            </p>
          </div>
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Student E-Mail: </h1>
            <p className="flex justify-end">{studentDetails?.email}</p>
          </div>
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Student Phone No: </h1>
            <p className="flex justify-end">
              {studentDetails?.primaryMobileNumber}
            </p>
          </div>
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Whatsapp No: </h1>
            <p className="flex justify-end">{studentDetails?.whatsappNumber}</p>
          </div>
        </div>

        {/* right-side ==> */}
        <div>
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Preferred Course: </h1>
            <p className="flex justify-end sm:text-end">
              {studentDetails?.preferredCourse}
            </p>
          </div>
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Preferred University: </h1>
            <p className="flex justify-end sm:text-end">
              {studentDetails?.preferredUniversity}
            </p>
          </div>
          {userinfo && userinfo === "mco" && (
            <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
              <h1 className="font-semibold">Student By: </h1>
              <p className="flex justify-end">{studentDetails?.createdBy}</p>
            </div>
          )}
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Application Date: </h1>
            <p className="flex justify-end">
              {formatDate(studentDetails?.createdAt)?.date}
            </p>
          </div>
          <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 py-1 sm:gap-4 flex-wrap">
            <h1 className="font-semibold">Application Time: </h1>
            <p className="flex justify-end">
              {formatDate(studentDetails?.createdAt)?.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
