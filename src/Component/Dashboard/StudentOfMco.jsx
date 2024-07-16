import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { PiStudent } from "react-icons/pi";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCheck } from "react-icons/fa6";
import { TbLocationBroken } from "react-icons/tb";
import StudentForAdmin from "./StudentForAdmin";

export default function StudentOfMco() {
  const { email } = useParams();
  const axiosPublic = useAxiosPublic();

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

  console.log(allStudentofMco)

  return (
    <div>
      <div className="grid justify-between gap-2 items-center grid-cols-3">
        <div className="bg-white rounded-md drop-shadow-md p-3 flex gap-5 items-center">
          <div className="flex justify-center items-center bg-customPurple p-4 text-white rounded-md">
            <PiStudent className="text-3xl" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-customPurple">
              Total Students
            </h1>
            <h1 className="text-xl text-gray-700">{allStudentofMco?.length}</h1>
          </div>
        </div>
        <div className="bg-white rounded drop-shadow-md p-3 flex gap-5 items-center">
          <div className="flex justify-center items-center bg-customPurple p-4 text-white rounded-md">
            <FaCheck className="text-3xl" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-customPurple">
              Enrolled Students
            </h1>
            <h1 className="text-xl text-gray-700">{enrollmentCount}</h1>
          </div>
        </div>
        <div className="bg-white rounded drop-shadow-md p-3 flex gap-5 items-center">
          <div className="flex justify-center items-center bg-customPurple p-4 text-white rounded-md">
            <TbLocationBroken className="text-3xl" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-customPurple">
              Dropout Students
            </h1>
            <h1 className="text-xl text-gray-700">{dropoutCount}</h1>
          </div>
        </div>
      </div>
      <StudentForAdmin allStudentofMco={allStudentofMco} isLoading={isLoading}/>
    </div>
  );
}
