import React, { useContext, useState } from "react";
import useDateFormatter from "../Hooks/useDateFormatter";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Loading from "../Component/Loading";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { IconButton, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

export default function AllAdminList() {
  // state
  const [searchQuery, setSearchQuery] = useState("");
  const { formatDate } = useDateFormatter();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    data: allAdminList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allAdmin"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/admin/get-all-admins`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      console.log(res);
      return res?.data?.admins || [];
    },
  });

  // search filter
  let filteredAdmin = allAdminList;
  if (searchQuery) {
    filteredAdmin = allAdminList.filter((admin) => {
      const emailMatches = admin.email
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
            Admin Records
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Explore Detailed Histories of Every Admin
          </Typography>
        </div>
        <label className="input input-bordered flex items-center gap-2 rounded border-gray-300 lg:w-auto w-full">
          <input
            type="text"
            className="grow "
            placeholder="Search by Admin email"
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

      {/* list */}
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {allAdminList?.length <= 0 ? (
              <tr className="flex justify-center w-full pt-8">
                <td>You dont have any Admin. Please Assign first</td>
              </tr>
            ) : (
              <div className="overflow-x-auto ">
                <table className="table table-sm">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="py-5 text-center">No.</th>
                      <th className="py-5 text-center">Admin ID</th>
                      <th className="py-5 text-center">Admin Name</th>
                      <th className="py-5 text-center">Admin Email</th>

                      <th className="py-5 text-center">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmin &&
                      filteredAdmin
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
