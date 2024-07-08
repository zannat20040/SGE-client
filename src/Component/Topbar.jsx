import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";

export default function Topbar({handleButtonClick}) {
  return (
    <div className="navbar bg-base-100 shadow-md mt-5 rounded-md mb-5">
      <div className="md:justify-end justify-between flex items-center gap-5 w-full">
        <div className="px-2 py-0 flex md:hidden ">
        <FaBarsStaggered onClick={handleButtonClick}/>
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
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <span>SY</span>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
