import { Chip } from "@material-tailwind/react";
import React from "react";
import { FaLeaf } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Logo({ color, role }) {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-3">
        <FaLeaf className="text-customPurple text-2xl" />
        <div className="flex gap-2">
          <h1 className={`font-medium ${color} text-xl`}>Shabuj Global</h1>
          <Chip size="sm"   value={role}  className="font-thin  bg-green-700 w-fit rounded-full text-xs" />
        </div>
      </div>
    </Link>
  );
}
