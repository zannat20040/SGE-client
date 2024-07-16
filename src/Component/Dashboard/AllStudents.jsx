import { useContext, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useStatus from "../../Hooks/useStatus";
import Loading from "../Loading";
import AllStudentsForMember from "../../Member Dashboard/AllStudentsForMember";
import AllStudentsForMCO from "../../MCO Dashboard/AllStudentsForMCO";

export default function AllStudents() {
  // states
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { userinfo } = useStatus();
  const [searchQuery, setSearchQuery] = useState("");

  // student fetch funciton
  const fetchStudents = async () => {
    let endpoint = "/member/my-students";
    if (userinfo && userinfo === "mco") {
      endpoint = "/mco/students";
    }
    const response = await axiosPublic.get(endpoint, {
      headers: {
        Authorization: `Bearer ${user?.email}`,
      },
    });
    refetch();
    return response.data;
  };


  const {
    data: studentsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students", userinfo],
    queryFn: fetchStudents,
  });


  // student filter
  let filteredStudents = studentsData;
  if (searchQuery) {
    filteredStudents = studentsData.filter((student) => {
      const studentId = student?._id;
      return (
        studentId && studentId.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
            placeholder="Search bu student id"
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
            {studentsData?.length == 0 ? (
              <tr className="flex justify-center w-full pt-8">
                <td>You dont have any student. Please create first</td>
              </tr>
            ) : (
              <>
                {userinfo && userinfo === "member" ? (
                  <AllStudentsForMember
                    filteredStudents={filteredStudents}
                    refetchStudents={refetch}
                  />
                ) : (
                  <AllStudentsForMCO />
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}
