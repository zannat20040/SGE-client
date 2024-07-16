import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Layout/Login";
import Signup from "./Layout/Signup";
import Dashboard from "./Layout/Dashboard";
import MemDasboard from "./Member Dashboard/MemDasboard";
import NewMember from "./Member Dashboard/NewMember";
import AllStudents from "./MCO Dashboard/AllStudents";
import MCOStudentDetails from "./MCO Dashboard/MCOStudentDetails";
import PrivateRoute from "./Hooks/PrivateRoute";
import AdminLogin from "./Layout/AdminLogin";
import NewMcoCreate from "./Admin Dashboard/NewMcoCreate";
import AllMCOList from "./Component/Dashboard/AllMCOList";
import StudentOfMco from "./Component/Dashboard/StudentOfMco";
import MemberListForAdmin from "./Component/Dashboard/MemberListForAdmin";
import StudentOfMember from "./Component/Dashboard/StudentOfMember";
import AllStudentsForAdmin from "./Component/Dashboard/AllStudentsForAdmin";

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
    element: (
      // <PrivateRoute>
      <Dashboard />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "member",
        element: (
          <PrivateRoute>
            <MemDasboard />
          </PrivateRoute>
        ),
      },
      {
        path: "newmember",
        element: (
          <PrivateRoute>
            <NewMember />
          </PrivateRoute>
        ),
      },
      {
        path: "allstudents",
        element: (
          <PrivateRoute>
            <AllStudents />
          </PrivateRoute>
        ),
      },
      {
        path: "allstudents/:id",
        element: (
          <PrivateRoute>
            <MCOStudentDetails />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "admin",
      //   element: <AdminLogin />,
      // },
      // {
      //   path: "admin/assignMCO",
      //   element: <NewMcoCreate />,
      // },
      {
        path: "admin/allMcoList",
        element: <AllMCOList />,
      },
      {
        path: "admin/allMcoList/students/:email",
        element: <StudentOfMco />,
      },
      {
        path: "admin/allMemberList",
        element: <MemberListForAdmin />,
      },
      {
        path: "admin/allMemberList/students/:email",
        element: <StudentOfMember />,
      },
      {
        path: "admin/allStudents",
        element: <AllStudentsForAdmin />,
      },
    ],
  },

  {
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        path: "dashboard",
        element: <AdminLogin />,
      },
      {
        path: "assignMCO",
        element: <NewMcoCreate />,
      },
    ],
  },
]);
