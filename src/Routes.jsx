import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Layout/Login";
import Signup from "./Layout/Signup";
import Dashboard from "./Layout/Dashboard";
import MemDasboard from "./Member Dashboard/MemDasboard";
import NewMember from "./Member Dashboard/NewMember";
import AllStudents from "./MCO Dashboard/AllStudents";
import MCOStudentDetails from "./MCO Dashboard/MCOStudentDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "member",
        element: <MemDasboard />,
      },
      {
        path: "newmember",
        element: <NewMember />,
      },
      {
        path: "allmembers",
        element: <AllStudents />,
      },
      // {
      //   path: "allmembers/:id",
      //   element: <MemberDetails />,
      // },
      {
        path: "allstudents",
        element: <AllStudents />,
      },
      {
        path: "allstudents/:id",
        element: <MCOStudentDetails />,
      },
    ],
  },
]);
