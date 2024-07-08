import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./Layout/Login";
import Signup from "./Layout/Signup";
import Dashboard from "./Layout/Dashboard";
import MemDasboard from "./Member Dashboard/MemDasboard";
import NewMember from "./Member Dashboard/NewMember";
import AllMembers from "./Member Dashboard/AllMembers";

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
    children:[
      {
        path:"member",
        element:<MemDasboard />
      } ,
      {
        path:"newmember",
        element:<NewMember />
      } ,
      {
        path:"allmembers",
        element:<AllMembers />
      }
    ]
  },
]);
