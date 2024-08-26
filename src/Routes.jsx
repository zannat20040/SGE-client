import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Layout/Login";
import Signup from "./Layout/Signup";
import Dashboard from "./Layout/Dashboard";
import MemDasboard from "./Member Dashboard/MemDasboard";
import NewMember from "./Member Dashboard/NewMember";
import PrivateRoute from "./Hooks/PrivateRoute";
import NewMcoCreate from "./Admin Dashboard/NewMcoCreate";
import AllMCOList from "./Admin Dashboard/AllMCOList";
import StudentOfMco from "./Admin Dashboard/StudentOfMco";
import MemberListForAdmin from "./Admin Dashboard/MemberListForAdmin";
import StudentOfMember from "./Admin Dashboard/StudentOfMember";
import AllStudentsForAdmin from "./Admin Dashboard/AllStudentsForAdmin";
import AdminDashboard from "./Admin Dashboard/AdminDashboard";
import MCODashboard from "./MCO Dashboard/MCODashboard";
import AllStudents from "./Component/Dashboard/AllStudents";
import DetailsTab from "./Component/Dashboard/DetailsTab";
import AdminCreate from "./Admin Dashboard/AdminCreate";

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
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
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
        path: "mco",
        element: (
          <PrivateRoute>
            <MCODashboard />
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
        path: "membersStudent",
        element: (
          <PrivateRoute>
            <AllStudents />
          </PrivateRoute>
        ),
      },
      {
        path: "mcoStudents",
        element: (
          <PrivateRoute>
            <AllStudents />
          </PrivateRoute>
        ),
      },
      {
        path: "student/:id",
        element: (
          <PrivateRoute>
            <DetailsTab />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      // {
      //   path: "adminCreate",
      //   element: <AdminCreate />,
      // },
      {
        path: "assignMCO",
        element: <NewMcoCreate />,
      },
      {
        path: "allMcoList",
        element: <AllMCOList />,
      },
      {
        path: "allMcoList/students/:email",
        element: <StudentOfMco />,
      },
      {
        path: "allMemberList",
        element: <MemberListForAdmin />,
      },
      {
        path: "allMemberList/students/:email",
        element: <StudentOfMember />,
      },
      {
        path: "allStudents",
        element: <AllStudentsForAdmin />,
      },
    ],
  },
]);
