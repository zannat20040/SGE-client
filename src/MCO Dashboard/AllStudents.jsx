import React, { useContext, useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useDateFormatter from "../Hooks/useDateFormatter";
import StatusModal from "../Component/StatusModal";
import useStatus from "../Hooks/useStatus";

export default function AllStudents() {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { formatDate } = useDateFormatter();
  const { userinfo } = useStatus();
  console.log(userinfo);

  const fetchStudents = async () => {
    let endpoint = "/member/my-students";
    if (userinfo === "mco") {
      endpoint = "/mco/students";
    }
    const response = await axiosPublic.get(endpoint, {
      headers: {
        Authorization: `Bearer ${user?.email}`,
      },
    });
    return response.data;
  };

  // Use the useQuery hook correctly with an object argument
  const { data: studentsData, refetch: refetchStudents } = useQuery({
    queryKey: ["students", userinfo],
    queryFn: fetchStudents,
  });

  console.log(studentsData);

  return (
    <div className="overflow-x-auto bg-white shadow-md  rounded-md">
      <table className="table table-sm">
        <thead className="bg-gray-300">
          <tr>
            <th className="py-5 text-center">No.</th>
            <th className="py-5 text-center">Student ID</th>
            <th className="py-5 text-center">Student Name</th>
            <th className="py-5 text-center">
              University Name/ Course Details
            </th>
            <th className="py-5 text-center">
              {userinfo === "mco" ? "Change Status" : "Status"}
            </th>
            <th className="py-5 text-center">Date</th>
            <th className="py-5 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentsData?.map((student, index) => (
            <tr key={student?._id} className="hover">
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{student?._id}</td>
              <td className="text-center">{`${student?.firstName} ${student?.lastName}`}</td>
              <td className="text-center">
                <p>{student?.preferredUniversity}</p>
                <p>{student?.preferredCourse}</p>
              </td>
              <td className="text-center">
                {/* The button to open modal */}
                {userinfo === "member" ? (
                  <button className="btn  rounded text-customPurple text-sm bg-[#e5e2ff] font-light">{student?.status?.status}</button>
                ) : (
                  <StatusModal
                    student={student}
                    id={student?._id}
                    refetchStudents={refetchStudents}
                    label={"Change"}
                  />
                )}
              </td>
              <td className="text-center">{formatDate(student?.createdAt)}</td>
              <td className="text-center">
                <Link to={`/dashboard/allstudents/${student?._id}`}>
                  <Tooltip content="Details" className="rounded">
                    <IconButton variant="text" className="rounded-full">
                      <IoEyeOutline className="h-3 w-3" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Tooltip content="Delete" className="rounded">
                  <IconButton variant="text" className="rounded-full">
                    <RiDeleteBin7Line className="h-3 w-3" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
