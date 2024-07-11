import { useContext } from "react";
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
import useStatus from "../Hooks/useStatus";
import FileUpload from "../Component/Dashboard/FileUpload";

export default function MCOStudentDetails() {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { userinfo } = useStatus();

  const fetchStudentDetails = async (id) => {
    let endpoint = `/member/student/${id}`;
    if (userinfo === "mco") {
      endpoint = `/mco/student/${id}`;
    }
    const response = await axiosPublic.get(endpoint, {
      headers: {
        Authorization: `Bearer ${user?.email}`,
      },
    });
    return response.data;
  };

  const { data: studentDetails, refetch } = useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudentDetails(id),
  });

  console.log(studentDetails);

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
      label: `${userinfo === "mco" ? "Upload" : "Download"}`,
      value: "Upload/Download",
      component: (
        <FileUpload studentDetails={studentDetails} refetch={refetch} />
      ),
    },
    {
      label: "Status",
      value: "Status",
      component: <MemberStatusDetails studentDetails={studentDetails} />,
    },
    {
      label: "Comment",
      value: "Comment",
      component: <Comment studentDetails={studentDetails} refetch={refetch} />,
    },
    {
      label: "University Communication",
      value: "University Communication",
      component: <div className="pt-5">Progressing......</div>,
    },
  ];

  return (
    <div className="bg-white rounded-md  shadow-md p-5 ">
      <Tabs value="Student/Course details" className="p-0 ">
        <TabsHeader className="items-center  p-2 flex-wrap sm:flex-nowrap rounded -z-0">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="text-xs lg:text-base py-4 sm:p-2">
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
