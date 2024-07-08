import React from "react";
import { FaLeaf } from "react-icons/fa6";

export default function Logo({color}) {
  return (
    <div className="flex items-center gap-3">
      <FaLeaf className="text-indigo-500 text-2xl" />
      <h1 className={`font-medium ${color} text-2xl`}>Shabuj Global</h1>
    </div>
  );
}
