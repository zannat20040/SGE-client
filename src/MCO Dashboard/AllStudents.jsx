import React, { useContext } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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

// const TABLE_HEAD = [
//   "Student ID",
//   "Student Name",
//   "University Name/ Course Details",
//   "Change Status",
//   "Date",
//   "Action",
// ];

const allowedStatuses = [
  "application processing",
  "application submitted",
  "pending doc's",
  "offer issue conditional",
  "offer issue unconditional",
  "need payment",
  "case Issued",
  "additional doc needed",
  "refund required",
  "application rejected",
  "session expired",
  "doc received",
  "partial payment",
  "enrollment",
  "dropout",
];

export default function AllStudents() {
  const { user, loading, setLoading } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const {
    data: studentsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await axiosPublic.get("/mco/students", {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      return response.data;
    },
  });

  console.log(studentsData);

  return (

    <div className="overflow-x-auto bg-white shadow-md p-7 rounded-md">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>No.</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>University Name/ Course Details</th>
            <th>Change Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentsData?.map(
            (
              {
                _id,
                firstName,
                lastName,
                preferredUniversity,
                preferredCourse,
                status,
                createdAt,
              },
              index
            ) => (
              <tr key={_id} className="hover">
                <td>{index + 1}</td>
                <td>{_id}</td>
                <td>{`${firstName} ${lastName}`}</td>
                <td>
                  <p>{preferredUniversity}</p>
                  <p>{preferredCourse}</p>
                </td>
                <td>
                  <select className="select select-primary w-full max-w-xs">
                    <option disabled selected>
                      Select the Status
                    </option>
                    {allowedStatuses?.map((selectedOption, index) => (
                      <option key={index}>{selectedOption}</option>
                    ))}
                  </select>
                </td>
                <td>{createdAt}</td>
                <td>
                  <Link to={`/dashboard/mco/allmembers/${_id}`}>
                    <Tooltip content="See details">
                      <IconButton variant="text">
                        <IoEyeOutline className="h-3 w-3" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip content="Delete member">
                    <IconButton variant="text">
                      <RiDeleteBin7Line className="h-3 w-3" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
