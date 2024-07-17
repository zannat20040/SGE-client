/* eslint-disable react/prop-types */
import useDateFormatter from "../Hooks/useDateFormatter";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { IoEyeOutline } from "react-icons/io5";
import CountdownForMember from "./CountdownForMember";

export default function AllStudentsForMember({
  filteredStudents,
  refetchStudents,
}) {
  const { formatDate } = useDateFormatter();

  return (
    <div className="overflow-x-auto ">
      <table className="table table-sm">
        <thead className="bg-gray-300">
          <tr>
            <th className="py-5 text-center">No.</th>
            <th className="py-5 text-center">Student ID</th>
            <th className="py-5 text-center">Student Name</th>
            <th className="py-5 text-center">
              University Name/ <br /> Course Details
            </th>
            <th className="py-5 text-center">Status</th>
            <th className="py-5 text-center">Date</th>
            <th className="py-5 text-center">Payment</th>
            <th className="py-5 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents
            ?.slice()
            .reverse()
            .map((student, index) => (
              <tr key={student?._id} className="hover">
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  ...{student?._id && student?._id.slice(-4)}
                </td>
                <td className="text-center">{`${student?.firstName} ${student?.lastName}`}</td>
                <td className="text-center">
                  <p>{student?.preferredUniversity}</p>
                  <p>{student?.preferredCourse}</p>
                </td>
                <td className="text-center">
                  <button className="  rounded text-customPurple text-xs p-2 bg-[#e5e2ff] font-light">
                    {student?.status?.status}
                  </button>
                </td>
                <td className="text-center">
                  <p>{formatDate(student?.createdAt)?.date}</p>
                  <p>{formatDate(student?.createdAt)?.time}</p>
                </td>
                <td className="text-center">
                  {student?.status?.status === "enrollment" ? (
                    <CountdownForMember
                      enrollmentStartDate={student?.enrollmentStartDate}
                      createdBy={student?.createdBy}
                      refetch={refetchStudents}
                      paymentStatus={student?.paymentStatus}
                    />
                  ) : (
                    <span className="text-green-800 font-bold">
                      {student?.paymentStatus}
                    </span>
                  )}
                </td>
                <td className="text-center">
                  <Link to={`/dashboard/student/${student?._id}`}>
                    <Tooltip content="Details" className="rounded">
                      <IconButton variant="text" className="rounded-full group">
                        <IoEyeOutline className="text-base group-hover:text-customPurple" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
