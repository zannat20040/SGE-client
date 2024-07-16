import React, { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useStatus from "../../Hooks/useStatus";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Updown from "./Updown";
import Comment from "./Comment";
import UniCommunication from "./UniCommunication";
import StudentDetailsLayout from "./StudentDetailsLayout";
import StudentStatusDetails from "./StudentStatusDetails";

export default function DetailsTab() {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { userinfo } = useStatus();

  // student details fetch function
  const fetchStudentDetails = async (id) => {
    let endpoint = `/member/student/${id}`;
    if (userinfo && userinfo === "mco") {
      endpoint = `/mco/student/${id}`;
    }
    const response = await axiosPublic.get(endpoint, {
      headers: {
        Authorization: `Bearer ${user?.email}`,
      },
    });
    return response.data;
  };

  const {
    data: studentDetails,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudentDetails(id),
  });

  // tab & tab panel
  const data = [
    {
      label: "Student/Course details",
      value: "Student/Course details",
      component: (
        <StudentDetailsLayout
          studentDetails={studentDetails}
          refetch={refetch}
        />
      ),
    },
    {
      label: `${userinfo && userinfo === "mco" ? "Upload" : "Download"}`,
      value: "Upload/Download",
      component: <Updown studentDetails={studentDetails} refetch={refetch} />,
    },
    {
      label: "Status",
      value: "Status",
      component: <StudentStatusDetails studentDetails={studentDetails} />,
    },
    {
      label: "Comment",
      value: "Comment",
      component: <Comment studentDetails={studentDetails} refetch={refetch} />,
    },
    {
      label: "University Communication",
      value: "University Communication",
      component: (
        <UniCommunication studentDetails={studentDetails} refetch={refetch} />
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-md  shadow-md p-5 ">
      <Tabs value="Student/Course details" className="p-0 ">
        {/* tab header */}
        <TabsHeader className="items-center  p-2 flex-wrap sm:flex-nowrap rounded -z-0">
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className="text-xs lg:text-base py-4 sm:p-2"
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        {/* tab body */}
        <TabsBody>
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value} className="p-0">
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
