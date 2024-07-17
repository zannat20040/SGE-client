import React, { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useDateFormatter from "../Hooks/useDateFormatter";
import { useQuery } from "@tanstack/react-query";
import { IconButton, Typography } from "@material-tailwind/react";
import Loading from "../Component/Loading";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

export default function MemberListForAdmin() {
  // states
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");
  const { formatDate } = useDateFormatter();

  // member list fetch
  const {
    data: allMemberList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allMember"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/admin/all-member`, {
        headers: {
          Authorization: `Bearer admin@gmail.com`,
        },
      });
      return res?.data;
    },
  });

  // search filter
  let filteredMember = allMemberList;
  if (searchQuery) {
    filteredMember = allMemberList.filter((member) => {
      const emailMatches = member.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return emailMatches;
    });
  }

  return (
    <div className="bg-white shadow-md  rounded-md pb-5">
      {/* header */}
      <div className="card-body border-b border-gray-200 flex justify-between items-center gap-5 flex-wrap flex-row">
        <div>
          <Typography variant="h5" color="blue-gray">
            Member Records
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Explore Detailed Histories of Every Member
          </Typography>
        </div>
        <label className="input input-bordered flex items-center gap-2 rounded border-gray-300 lg:w-auto w-full">
          <input
            type="text"
            className="grow "
            placeholder="Search by member email"
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

      {/* member list */}
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {allMemberList?.length == 0 ? (
              <tr className="flex justify-center w-full pt-8">
                <td>Currenty no members are available</td>
              </tr>
            ) : (
              <div className="overflow-x-auto ">
                <table className="table table-sm">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="py-5 text-center">No.</th>
                      <th className="py-5 text-center">Member ID</th>
                      <th className="py-5 text-center">Member Name</th>
                      <th className="py-5 text-center">Member Email</th>
                      <th className="py-5 text-center">Phone Number</th>

                      <th className="py-5 text-center">Date</th>
                      <th className="py-5 text-center">Member's Student</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMember
                      ?.slice()
                      .reverse()
                      .map((member, index) => (
                        <tr key={member?._id} className="hover">
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            ...{member?._id && member?._id.slice(-4)}
                          </td>
                          <td className="text-center">{`${member?.firstName} ${member?.lastName}`}</td>
                          <td className="text-center">{member?.email}</td>
                          <td className="text-center">
                            {member?.primaryMobileNumber}
                          </td>

                          <td className="text-center">
                            <p>{formatDate(member?.createdAt)?.date}</p>
                            <p>{formatDate(member?.createdAt)?.time}</p>
                          </td>

                          <td className="text-center">
                            <Link
                              to={`/admin/allMemberList/students/${member?.email}`}
                            >
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
