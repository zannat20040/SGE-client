import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { PiStudent } from "react-icons/pi";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCheck } from "react-icons/fa6";
import { TbLocationBroken } from "react-icons/tb";
import useDateFormatter from "../../Hooks/useDateFormatter";
import { IconButton } from "@material-tailwind/react";
import { IoEyeOutline } from "react-icons/io5";
import Loading from "../Loading";

export default function StudentOfMco() {
  const { email } = useParams();
  const axiosPublic = useAxiosPublic();
  const { formatDate } = useDateFormatter();

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

  console.log(allStudentofMco);

  return (
    <div>
      <div className="grid justify-between gap-2 items-center grid-cols-3">
        <div className="bg-white rounded-md drop-shadow-md p-3 flex gap-5 items-center">
          <div className="flex justify-center items-center bg-customPurple p-4 text-white rounded-md">
            <PiStudent className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl  text-customPurple">
              Total Students
            </h1>
            <h1 className=" text-gray-700">
              {allStudentofMco?.length} student
            </h1>
          </div>
        </div>
        <div className="bg-white rounded drop-shadow-md p-3 flex gap-5 items-center">
          <div className="flex justify-center items-center bg-customPurple p-4 text-white rounded-md">
            <FaCheck className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl  text-customPurple">
              Enrolled Students
            </h1>
            <h1 className=" text-gray-700">{enrollmentCount} student</h1>
          </div>
        </div>
        <div className="bg-white rounded drop-shadow-md p-3 flex gap-5 items-center">
          <div className="flex justify-center items-center bg-customPurple p-4 text-white rounded-md">
            <TbLocationBroken className="text-2xl" />
          </div>
          <div>
            <h1 className="text-xl text-customPurple">
              Dropout Students
            </h1>
            <h1 className=" text-gray-700">{dropoutCount} student</h1>
          </div>
        </div>
      </div>
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
    </div>
  );
}
