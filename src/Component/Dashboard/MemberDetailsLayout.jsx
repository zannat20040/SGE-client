import React from "react";
import useDateFormatter from "../../Hooks/useDateFormatter";
import StatusModal from "../StatusModal";

export default function MemberDetailsLayout({ studentDetails, refetch }) {
  const { formatDate } = useDateFormatter();

  return (
    <div className="w-full card-body">
      <div className="flex justify-end gap-4 flex-wrap items-center">
        <h1>Currrent Status : </h1>
        <StatusModal
          label={`${studentDetails?.status?.status}`}
          student={studentDetails}
          id={studentDetails?._id}
          refetchStudents={refetch}
        />
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Student ID</h1>
        <p className="flex justify-end">{studentDetails?._id}</p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Student Name</h1>
        <p className="flex justify-end">
          {studentDetails?.firstName + " " + studentDetails?.lastName}
        </p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Student E-Mail</h1>
        <p className="flex justify-end">{studentDetails?.email}</p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Preferred Course</h1>
        <p className="flex justify-end">{studentDetails?.preferredCourse}</p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Preferred University</h1>
        <p className="flex justify-end">
          {studentDetails?.preferredUniversity}
        </p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Student Phone No.</h1>
        <p className="flex justify-end">
          {studentDetails?.primaryMobileNumber}
        </p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Communication Phone No.</h1>
        <p className="flex justify-end">{studentDetails?.whatsappNumber}</p>
      </div>

      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Student By</h1>
        <p className="flex justify-end">{studentDetails?.createdBy}</p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 flex-wrap">
        <h1 className="font-semibold">Date/Time</h1>
        <p className="flex justify-end">
          {" "}
          {formatDate(studentDetails?.createdAt)}
        </p>
      </div>
    </div>
  );
}
