import React, { useMemo } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TbLocationBroken } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import Loading from "../Component/Loading";
import useDateFormatter from "../Hooks/useDateFormatter";
import { CiDollar } from "react-icons/ci";

export default function StudentOfMember() {
  // states
  const { email } = useParams();
  const axiosPublic = useAxiosPublic();
  const { formatDate } = useDateFormatter();

  // all student fetch for member
  const {
    data: allStudentofMember,
    isLoading,
  } = useQuery({
    queryKey: ["allStudentofMco", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/member/my-students`, {
        headers: {
          Authorization: `Bearer ${email}`,
        },
      });
      return res?.data;
    },
  });

  // insight counting
  const enrollmentCount = useMemo(() => {
    if (!allStudentofMember) return 0;
    return allStudentofMember.filter(
      (student) => student.status.status === "enrollment"
    ).length;
  }, [allStudentofMember]);

  const dropoutCount = useMemo(() => {
    if (!allStudentofMember) return 0;
    return allStudentofMember.filter(
      (student) => student.status.status === "dropout"
    ).length;
  }, [allStudentofMember]);

  // enrolled student fetch
  const { data: getEnrolledStudent } = useQuery({
    queryKey: ["allEnrolledStudent", email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/member/enrolled/${email}`, {
        headers: {
          Authorization: `Bearer ${email}`,
        },
      });
      return res?.data;
    },
  });

  // member earning count
  const totalEarned = useMemo(() => {
    if (!getEnrolledStudent) return 0;

    const totalStudents = getEnrolledStudent.length;
    const firstFourCount = Math.min(totalStudents, 4);
    const remainingCount = Math.max(0, totalStudents - 4);

    const amountForFirstFour = 300 * firstFourCount;
    const amountForRemaining = 400 * remainingCount;

    return amountForFirstFour + amountForRemaining;
  }, [allStudentofMember]);

  return (
    <div>
      {/* insight */}
      <div className="grid justify-between gap-2 items-center sm:grid-cols-2 grid-cols-1 ">
        <div className="bg-white rounded-md drop-shadow-md p-3 flex gap-3 items-center">
          <div className="flex justify-center items-center bg-customPurple p-3 text-white rounded-md">
            <PiStudent className="text-xl" />
          </div>
          <div>
            <h1 className="text-customPurple">Total Students</h1>
            <h1 className=" text-gray-700">
              {allStudentofMember?.length} student
            </h1>
          </div>
        </div>
        <div className="bg-white rounded drop-shadow-md p-3 flex gap-3 items-center">
          <div className="flex justify-center items-center bg-customPurple p-3 text-white rounded-md">
            <FaCheck className="text-xl" />
          </div>
          <div>
            <h1 className="text-customPurple">Enrolled Students</h1>
            <h1 className=" text-gray-700">{enrollmentCount} student</h1>
          </div>
        </div>
        <div className="bg-white rounded drop-shadow-md p-3 flex gap-3 items-center">
          <div className="flex justify-center items-center bg-customPurple p-3 text-white rounded-md">
            <TbLocationBroken className="text-xl" />
          </div>
          <div>
            <h1 className="text-customPurple">Dropout Students</h1>
            <h1 className=" text-gray-700">{dropoutCount} student</h1>
          </div>
        </div>
        <div className="bg-white rounded drop-shadow-md p-3 flex gap-3 items-center">
          <div className="flex justify-center items-center bg-customPurple p-3 text-white rounded-md">
            <CiDollar className="text-xl" />
          </div>
          <div>
            <h1 className="text-customPurple">Total Earned</h1>
            <h1 className="text-gray-700">${totalEarned}</h1>
          </div>
        </div>
      </div>

      {/* list */}
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {!allStudentofMember || allStudentofMember?.length == 0 ? (
              <tr className="flex justify-center w-full pt-8">
                <td>This Member doesn't have any student right now</td>
              </tr>
            ) : (
              <div className="overflow-x-auto bg-white mt-4">
                <table className="table table-sm">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="py-5 text-center">No.</th>
                      <th className="py-5 text-center">Student ID</th>
                      <th className="py-5 text-center">Student Name</th>
                      <th className="py-5 text-center">Assigned To</th>
                      <th className="py-5 text-center">
                        Preferred Course/ <br />
                        Preferred University
                      </th>
                      <th className="py-5 text-center">Date</th>
                      <th className="py-5 text-center">Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudentofMember
                      ?.slice()
                      .reverse()
                      .map((student, index) => (
                        <tr key={student?._id} className="hover">
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            ...{student?._id && student?._id.slice(-4)}
                          </td>
                          <td className="text-center">{`${student?.firstName} ${student?.lastName}`}</td>
                          <td className="text-center">{student?.assignedTo}</td>
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
    </div>
  );
}