import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";

export default function AdminTopbar({ handleButtonClick }) {

  return (
    <div className="navbar bg-base-100 shadow-md  rounded-md mb-5    sticky top-0 z-[3]   ">
      <div className="md:justify-end justify-between flex items-center gap-5 w-full px-4 py-2">
        <div className=" flex md:hidden ">
          <FaBarsStaggered onClick={handleButtonClick} />
        </div>
        <div className="flex gap-5 items-center">
          <div className="form-control">
            <h1>Shabuj Global Admin</h1>
          </div>
          <div className="dropdown dropdown-end">
            <div className="avatar placeholder online">
              <div className="bg-customPurple text-neutral-content w-8 rounded-full">
                <span>A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
