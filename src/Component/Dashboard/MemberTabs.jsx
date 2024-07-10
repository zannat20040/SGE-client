import React, { Component } from "react";
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

export default function MemberTabs() {
  const data = [
    {
      label: "Student/Course details",
      value: "Student/Course details",
      component: <MemberDetailsLayout />,
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
      desc: `We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams.`,
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
