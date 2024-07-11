import React from "react";
import useDateFormatter from "../../Hooks/useDateFormatter";
import StatusModal from "../StatusModal";
import useStatus from "../../Hooks/useStatus";

export default function MemberDetailsLayout({ studentDetails, refetch }) {
  const { formatDate } = useDateFormatter();
  const { userinfo } = useStatus();

  return (
    <div className="w-full pb-10 flex flex-col gap-1">
      <div className="flex justify-end gap-4 flex-wrap items-center">
\        {userinfo === "mco" && (
          <StatusModal
            label={`${studentDetails?.status?.status}`}
            student={studentDetails}
            id={studentDetails?._id}
            refetchStudents={refetch}
          />
        )}
      </div>
      <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
        <h1 className="font-semibold">Student ID: </h1>
        <p className="flex justify-end">{studentDetails?._id}</p>
      </div>
      <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
        <h1 className="font-semibold">Student Name: </h1>
        <p className="flex justify-end">
          {studentDetails?.firstName + " " + studentDetails?.lastName}
        </p>
      </div>
      <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
        <h1 className="font-semibold">Student E-Mail: </h1>
        <p className="flex justify-end">{studentDetails?.email}</p>
      </div>
      <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
        <h1 className="font-semibold">Preferred Course: </h1>
        <p className="flex justify-end">{studentDetails?.preferredCourse}</p>
      </div>
      <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
        <h1 className="font-semibold">Preferred University: </h1>
        <p className="flex justify-end">
          {studentDetails?.preferredUniversity}
        </p>
      </div>
      <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
        <h1 className="font-semibold">Student Phone No: </h1>
        <p className="flex justify-end">
          {studentDetails?.primaryMobileNumber}
        </p>
      </div>
      <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
        <h1 className="font-semibold">Whatsapp No: </h1>
        <p className="flex justify-end">{studentDetails?.whatsappNumber}</p>
      </div>

      {userinfo === "mco" && (
        <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
          <h1 className="font-semibold">Student By: </h1>
          <p className="flex justify-end">{studentDetails?.createdBy}</p>
        </div>
      )}

      <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
        <h1 className="font-semibold">Date/Time: </h1>
        <p className="flex justify-end">
          {" "}
          {formatDate(studentDetails?.createdAt)}
        </p>
      </div>
      {userinfo === "member" && (
        <div className="flex sm:grid grid-cols-2 justify-between gap-2 border-b border-gray-200 p-5 sm:gap-4 flex-wrap">
          <h1 className="font-semibold">Current Status: </h1>
          <button className=" text-customPurple   flex justify-end">
            {studentDetails?.status?.status}
          </button>
        </div>
      )}
    </div>
  );
}
