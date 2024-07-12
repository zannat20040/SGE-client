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
        path: "newmember",
        element: (
          <PrivateRoute>
            <NewMember />
          </PrivateRoute>
        ),
      },
      {
        path: "allmembers",
        element: (
          <PrivateRoute>
            <AllStudents />
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
    ],
  },
]);
