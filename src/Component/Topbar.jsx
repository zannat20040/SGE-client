import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";

export default function Topbar({ handleButtonClick }) {
  return (
    <div className="navbar bg-base-100 shadow-md  rounded-md mb-5">
      <div className="md:justify-end justify-between flex items-center gap-5 w-full px-4 py-2">
        <div className=" flex md:hidden ">
          <FaBarsStaggered onClick={handleButtonClick} />
        </div>
        <div className="flex gap-5 items-center">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div className="avatar placeholder online">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span>SY</span>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}
