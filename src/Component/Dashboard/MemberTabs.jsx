import React, { Component, useContext } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import MemberDetailsLayout from "./MemberDetailsLayout";
import MemberStatusDetails from "./MemberStatusDetails";
import Comment from "./Comment";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useDateFormatter from "../../Hooks/useDateFormatter";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function MemberTabs() {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data: studentDetails, refetch } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/mco/student/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      });
      console.log(response);
      return response.data;
    },
  });

  console.log(studentDetails);

  const data = [
    {
      label: "Student/Course details",
      value: "Student/Course details",
      component: (
        <MemberDetailsLayout
          // studentDetails={studentDetails}
          // refetch={refetch}
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
      component: <MemberStatusDetails />,
    },
    {
      label: "Comment",
      value: "Comment",
      component: <Comment />,
    },
    {
      label: "University Communication",
      value: "University Communication",
      component: <div className="card-body">No content</div>,
    },
  ];

  return (
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
  );
}
