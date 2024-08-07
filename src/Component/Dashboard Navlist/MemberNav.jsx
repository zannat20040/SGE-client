import React from "react";
import { NavLink } from "react-router-dom";
import { List, ListItemPrefix } from "@material-tailwind/react";
import { MdGroups } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function MemberNav() {
  const activeStyle = {
    backgroundColor: "#7367f0",
    color: "#FFFFFF",
  };

  const inactiveStyle = {
    color: "white", // Gray text for inactive link
  };

  return (
    <List>
      <NavLink
        to="member"
        className="flex items-center  p-3 rounded-md text-white hover:bg-gray-900/30 transition hover:text-white "
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        <ListItemPrefix>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
              clipRule="evenodd"
            />
          </svg>
        </ListItemPrefix>
        Dashboard
      </NavLink>
      <NavLink
        to="newmember"
        className="flex items-center  p-3 rounded-md text-white hover:bg-gray-900/30 transition hover:text-white"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        <ListItemPrefix>
          <FaRegUser />
        </ListItemPrefix>
        Add a new Student
      </NavLink>
      <NavLink
        to="membersStudent"
        className="flex items-center  p-3 rounded-md text-white hover:bg-gray-900/30 transition hover:text-white"
        style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
      >
        <ListItemPrefix>
          <MdGroups />
        </ListItemPrefix>
        My Students
      </NavLink>
    </List>
  );
}
