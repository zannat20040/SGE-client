import React, { useContext, useState } from "react";
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
import toast from "react-hot-toast";

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
  const [statusUpdateData, setStatusUpdateData] = useState(null);

  const {
    data: studentsData,
    isLoading,
    isError,
    refetch: refetchStudents,
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

  const HandleStatus = async (e, id) => {
    e.preventDefault();

    const form = e.target;
    const status = form.selectedValue.value;
    const comment = form.comment.value;

    const statusData = {
      status,
      comment,
    };

    try {
      const response = await axiosPublic.post(
        `/mco/change-status/${id}`,
        statusData,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      toast.success("Status updated succesfully");
      setStatusUpdateData(response.data);
      refetchStudents();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

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
            <th className="py-5 text-center">Change Status</th>
            <th className="py-5 text-center">Date</th>
            <th className="py-5 text-center">Action</th>
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
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{_id}</td>
                <td className="text-center">{`${firstName} ${lastName}`}</td>
                <td className="text-center">
                  <p>{preferredUniversity}</p>
                  <p>{preferredCourse}</p>
                </td>
                <td className="text-center">
                  {/* The button to open modal */}
                  <label
                    htmlFor={`my_modal_${index}`}
                    className="btn btn-xs rounded bg-customPurple text-sm text-white font-light"
                  >
                    Change
                  </label>

                  {/* Put this part before </body> tag */}
                  <input
                    type="checkbox"
                    id={`my_modal_${index}`}
                    className="modal-toggle "
                  />
                  <div className="modal " role="dialog">
                    <div className="modal-box rounded-md ">
                      <h3 className="text-lg font-bold mb-8">
                        Change status for {firstName + " " + lastName}
                      </h3>
                      <form
                        className="flex flex-col gap-2"
                        onSubmit={(e) => HandleStatus(e, _id)}
                      >
                        <div className="form-control">
                          <select
                            name="selectedValue"
                            required
                            className="select select-primary border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select Current Status
                            </option>
                            {allowedStatuses?.map((selectedOption, index) => (
                              <option key={index} value={selectedOption}>
                                {selectedOption}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-control">
                          <input
                            type="textarea"
                            className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                            placeholder="Write here a comment"
                            name="comment"
                          />
                        </div>
                        <div className="form-control ">
                          <button className="btn  text-white font-medium uppercase bg-customPurple">
                            Change
                          </button>
                        </div>
                      </form>
                    </div>
                    <label
                      className="modal-backdrop"
                      htmlFor={`my_modal_${index}`}
                    >
                      Close
                    </label>
                  </div>
                </td>
                <td className="text-center">{formatDate(createdAt)}</td>
                <td className="text-center">
                  <Link to={`/dashboard/allstudents/${_id}`}>
                    <Tooltip content="See details">
                      <IconButton variant="text" className="rounded-full">
                        <IoEyeOutline className="h-3 w-3" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip content="Delete member">
                    <IconButton variant="text" className="rounded-full">
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
