import React, { useContext } from "react";
import MemberDetailsLayout from "../Component/Dashboard/MemberDetailsLayout";
import MemberStatusDetails from "../Component/Dashboard/MemberStatusDetails";
import Comment from "../Component/Dashboard/Comment";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export default function MCOStudentDetails() {
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const {
    data: studentDetails,
    refetch,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/mco/student/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      return response.data;
    },
  });

  const data = [
    {
      label: "Student/Course details",
      value: "Student/Course details",
      component: (
        <MemberDetailsLayout
          studentDetails={studentDetails}
          refetch={refetch}
        />
      ),
    },
    {
      label: "Upload/Download",
      value: "Upload/Download",
      component: <div className="card-body">No content</div>,
    },
    {
      label: "Status",
      value: "Status",
      component: <MemberStatusDetails studentDetails={studentDetails} />,
    },
    {
      label: "Comment",
      value: "Comment",
      component: <Comment />,
    },
    {
      label: "University Communication",
      value: "University Communication",
      desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <div className="bg-white rounded-md  shadow-md">
      <Tabs value="Student/Course details" className="p-0">
        <TabsHeader className="items-center rounded-none p-2">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
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
