import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Loading";
import useDateFormatter from "../../Hooks/useDateFormatter";
import useAllMcoList from "../../Hooks/useAllMcoList";

export default function AllMCOList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { formatDate } = useDateFormatter();
  const { allMcoList, isLoading, refetch } = useAllMcoList();


  let filteredMco = allMcoList;
  if (searchQuery) {
    filteredMco = allMcoList.filter((mco) => {
      const firstNameMatches = mco.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const lastNameMatches = mco.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return firstNameMatches || lastNameMatches;
    });
  }

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
            {allMcoList?.length == 0 ? (
              <tr className="flex justify-center w-full pt-8">
                <td>You dont have any MCO. Please Assign first</td>
              </tr>
            ) : (
              <div className="overflow-x-auto ">
                <table className="table table-sm">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="py-5 text-center">No.</th>
                      <th className="py-5 text-center">MCO ID</th>
                      <th className="py-5 text-center">MCO Name</th>
                      <th className="py-5 text-center">MCO Email</th>

                      <th className="py-5 text-center">Date</th>
                      <th className="py-5 text-center">Assigned Student</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMco
                      ?.slice()
                      .reverse()
                      .map((mco, index) => (
                        <tr key={mco?._id} className="hover">
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            ...{mco?._id && mco?._id.slice(-4)}
                          </td>
                          <td className="text-center">{`${mco?.firstName} ${mco?.lastName}`}</td>
                          <td className="text-center">{mco?.email}</td>

                          <td className="text-center">
                            <p>{formatDate(mco?.createdAt)?.date}</p>
                            <p>{formatDate(mco?.createdAt)?.time}</p>
                          </td>

                          <td className="text-center">
                            <Link to={`students/${mco?.email}`}>
                              <IconButton
                                variant="text"
                                className="rounded-full group"
                              >
                                <IoEyeOutline className="text-base group-hover:text-customPurple" />
                              </IconButton>
                            </Link>
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
