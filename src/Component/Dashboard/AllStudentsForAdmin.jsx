import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useDateFormatter from "../../Hooks/useDateFormatter";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@material-tailwind/react";
import Loading from "../Loading";
import useAllMcoList from "../../Hooks/useAllMcoList";
import swal from "sweetalert";

export default function AllStudentsForAdmin() {
  const axiosPublic = useAxiosPublic();
  const { formatDate } = useDateFormatter();
  const [searchQuery, setSearchQuery] = useState("");
  const { allMcoList, isLoading: mcoListLoading } = useAllMcoList();
  const [selectedMco, setSelectedMco] = useState("");
  console.log(selectedMco);

  const {
    data: allStudents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allStudentsforadmin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/admin/all-students`, {
        headers: {
          Authorization: `Bearer admin@gmail.com`,
        },
      });
      return res?.data;
    },
  });

  let filteredStudents = allStudents;

  if (searchQuery) {
    filteredStudents = allStudents.filter((student) => {
      const studentId = student?._id;
      return (
        studentId && studentId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }

  const HandleMCOAssign = (e, id) => {
    setSelectedMco(e.target.value);
    console.log(id);

    swal({
      title: "Do you really want to assign this MCO?",
      text: "Once you assigned , You will not be able to change it further.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosPublic
          .post(`/admin/assign-student/${id}`, {
            headers: {
              Authorization: `Bearer admin@gmail.com`,
            },
          })
          .then((res) => {
            console.log(res.data);
            
          })
          .catch(err=>console.log(err))
      } else {
        swal("You didn't assign any MCO to this student");
      }
    });
  };

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
        <label className="input input-bordered flex items-center gap-2 rounded border-gray-300 lg:w-auto w-full">
          <input
            type="text"
            className="grow "
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {allStudents?.length == 0 ? (
              <tr className="flex justify-center w-full pt-8">
                <td>No students data are available</td>
              </tr>
            ) : (
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

                      <th className="py-5 text-center">Date</th>
                      <th className="py-5 text-center">Status</th>
                      <th className="py-5 text-center">Assigned To</th>
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
                            <p>{formatDate(student?.createdAt)?.date}</p>
                            <p>{formatDate(student?.createdAt)?.time}</p>
                          </td>
                          <td className="text-center">
                            <button className="  rounded text-customPurple text-xs p-2 bg-[#e5e2ff] font-light">
                              {student?.status?.status}
                            </button>
                          </td>
                          <td className="text-center">
                            {student?.assignedTo === "Not Assigned" ? (
                              <>
                                <select
                                  className="input input-sm border border-gray-200 rounded bg-white text-gray-700 hover:text-gray-900  focus:outline-0"
                                  value={selectedMco}
                                  onChange={(e) =>
                                    HandleMCOAssign(e, student?._id)
                                  }
                                >
                                  <option value="" disabled>
                                    Select MCO
                                  </option>
                                  {allMcoList.map((mco) => (
                                    <option
                                      key={mco?._id}
                                      value={mco?.email}
                                      className="capitalize"
                                    >
                                      {mco?.firstName} {mco?.lastName}
                                    </option>
                                  ))}
                                </select>{" "}
                              </>
                            ) : (
                              <> {student?.assignedTo}</>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
