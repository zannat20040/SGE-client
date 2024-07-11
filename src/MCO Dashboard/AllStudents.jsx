import React, { useContext } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
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

  const { data: studentsData, refetch: refetchStudents } = useQuery({
    queryKey: ["students", userinfo],
    queryFn: fetchStudents,
  });

  return (
    <div className="bg-white shadow-md  rounded-md pb-5">
      <div className="card-body border-b border-gray-200 flex justify-between items-center gap-5 flex-wrap flex-row">
        <div>
          <Typography variant="h5" color="blue-gray">
            Student Records
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Explore Detailed Histories of Every Student
          </Typography>
        </div>
        <label className="input input-bordered flex items-center gap-2 rounded-md border-gray-300">
          <input type="text" className="grow " placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="overflow-x-scroll ">
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
                    <button className="  rounded text-customPurple text-xs p-2 bg-[#e5e2ff] font-light">
                      {student?.status?.status}
                    </button>
                  ) : (
                    <StatusModal
                      student={student}
                      id={student?._id}
                      refetchStudents={refetchStudents}
                      label={"Change"}
                    />
                  )}
                </td>
                <td className="text-center">
                  {formatDate(student?.createdAt)}
                </td>
                <td className="text-center">
                  <Link to={`/dashboard/allstudents/${student?._id}`}>
                    <Tooltip content="Details" className="rounded ">
                      <IconButton variant="text" className="rounded-full group">
                        <IoEyeOutline className="h-3 w-3 group-hover:text-customPurple" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip content="Delete" className="rounded ">
                    <IconButton variant="text" className="rounded-full group">
                      <RiDeleteBin7Line className="h-3 w-3 group-hover:text-customPurple" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}