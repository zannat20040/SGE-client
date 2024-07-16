import React from "react";
import Loading from "../Loading";
import useDateFormatter from "../../Hooks/useDateFormatter";
import { IconButton } from "@material-tailwind/react";
import { IoEyeOutline } from "react-icons/io5";

export default function StudentForAdmin({ allStudentofMco, isLoading }) {
  const { formatDate } = useDateFormatter();

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {allStudentofMco?.length == 0 ? (
            <tr className="flex justify-center w-full pt-8">
              <td>This MCO doesn't have any student right now</td>
            </tr>
          ) : (
            <div className="overflow-x-auto bg-white mt-4">
              <table className="table table-sm">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="py-5 text-center">No.</th>
                    <th className="py-5 text-center">Student ID</th>
                    <th className="py-5 text-center">Student Name</th>
                    <th className="py-5 text-center">Student By</th>
                    <th className="py-5 text-center">
                      Preferred Course/ <br />
                      Preferred University
                    </th>
                    <th className="py-5 text-center">Date</th>
                    <th className="py-5 text-center">Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allStudentofMco
                    ?.slice()
                    .reverse()
                    .map((student, index) => (
                      <tr key={student?._id} className="hover">
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          ...{student?._id && student?._id.slice(-4)}
                        </td>
                        <td className="text-center">{`${student?.firstName} ${student?.lastName}`}</td>
                        <td className="text-center">{student?.createdBy}</td>
                        <td className="text-center">
                          {student?.preferredCourse}
                          <br />
                          {student?.preferredUniversity}
                        </td>

                        <td className="text-center">
                          <p>{formatDate(student?.createdAt)?.date}</p>
                          <p>{formatDate(student?.createdAt)?.time}</p>
                        </td>

                        <td className="text-center">
                          <button className="  rounded text-customPurple text-xs p-2 bg-[#e5e2ff] font-light">
                            {student?.status?.status}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
