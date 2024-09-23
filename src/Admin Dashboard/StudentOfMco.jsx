import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { PiStudent } from "react-icons/pi";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FaCheck } from "react-icons/fa6";
import { TbLocationBroken } from "react-icons/tb";
import useDateFormatter from "../Hooks/useDateFormatter";
import Loading from "../Component/Loading";

export default function StudentOfMco() {
  // states
  const { email } = useParams();
  const axiosPublic = useAxiosPublic();
  const { formatDate } = useDateFormatter();

  // all studet fetch for mco
  const {
    data: allStudentofMco,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allStudentofMco", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/mco/students`, {
        headers: {
          Authorization: `Bearer ${email}`,
        },
      });
      return res?.data;
    },
  });

  // insight counting

  const enrollmentCount = useMemo(() => {
    if (!allStudentofMco) return 0;
    return allStudentofMco.filter(
      (student) => student.status.status === "enrollment"
    ).length;
  }, [allStudentofMco]);

  const dropoutCount = useMemo(() => {
    if (!allStudentofMco) return 0;
    return allStudentofMco.filter(
      (student) => student.status.status === "dropout"
    ).length;
  }, [allStudentofMco]);

  return (
    <div>
      {/* insight */}
      <div className="grid justify-between gap-2 items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
        <div className="md:col-span-2 lg:col-auto bg-white rounded-md drop-shadow-md p-3 flex gap-3 items-center h-full">
          <div className="flex justify-center items-center bg-customPurple p-3 text-white rounded-md">
            <PiStudent className="text-xl" />
          </div>
          <div>
            <h1 className="  text-customPurple">Total Students</h1>
            <h1 className=" text-gray-700">
              {allStudentofMco?.length} student
            </h1>
          </div>
        </div>
        <div className=" bg-white rounded drop-shadow-md p-3 flex gap-3 items-center h-full">
          <div className="flex justify-center items-center bg-customPurple p-3 text-white rounded-md">
            <FaCheck className="text-xl" />
          </div>
          <div>
            <h1 className=" text-customPurple">Enrolled Students</h1>
            <h1 className=" text-gray-700">{enrollmentCount} student</h1>
          </div>
        </div>
        <div className="bg-white rounded drop-shadow-md p-3 flex gap-3 items-center h-full">
          <div className="flex justify-center items-center bg-customPurple p-3 text-white rounded-md">
            <TbLocationBroken className="text-xl" />
          </div>
          <div>
            <h1 className=" text-customPurple">Dropout Students</h1>
            <h1 className=" text-gray-700">{dropoutCount} student</h1>
          </div>
        </div>
      </div>
      {/* student list */}
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
                            <button
                              className={`rounded text-xs p-1  px-4 font-semibold ${
                                student?.status?.status ===
                                "application processing"
                                  ? "text-orange-600 bg-orange-50"
                                  : student?.status?.status ===
                                    "application submitted"
                                  ? "text-cyan-600 bg-cyan-50"
                                  : student?.status?.status === "dropout"
                                  ? "text-red-600 bg-red-50 "
                                  : student?.status?.status === "enrollment"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-[#cfcbf580] text-customPurple"
                              }  `}
                            >
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
    </div>
  );
}
