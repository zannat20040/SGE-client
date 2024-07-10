import React from "react";
import { FaLeaf } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Logo({ color }) {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-3">
        <FaLeaf className="text-indigo-500 text-2xl" />
        <h1 className={`font-medium ${color} text-2xl`}>Shabuj Global</h1>
      </div>
    </Link>
  );
}
