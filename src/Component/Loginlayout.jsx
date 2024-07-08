import React from "react";
import { FaLeaf } from "react-icons/fa6";

export default function Loginlayout() {
  return (
    <div className="  md:bg-[#f6f6f6] bg-white ">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between  gap-0 md:gap-10">
        <div className="p-4 md:p-10  lg:col-span-2 ">
          <div className="flex items-center gap-3">
            <FaLeaf className="text-indigo-500 text-2xl" />
            <h1 className="font-semibold text-black text-2xl">Shabuj Global</h1>
          </div>
          <div className="h-full hidden md:flex items-center justify-center px-10 w-full">
            <img
              src="https://st.depositphotos.com/1144687/1902/i/450/depositphotos_19024147-stock-photo-drawing-city-over-book.jpg"
              className="w-4/5 flex mx-auto"
            />
          </div>
        </div>
        <div className=" p-4 md:p-10  pb-16 card h-full bg-white w-full  rounded-none">
          <h1 className="font-semibold text-2xl md:mt-20">
            Welcome to Shabuj Global
          </h1>
          <p className="text-sm mt-2">
            {" "}
            Please sign-in to your account and start the adventure{" "}
          </p>
          <form className="mt-10 ">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                className="input focus:outline-none input-bordered rounded bg-white border-2 border-gray-100 focus:border-indigo-500"
                required
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type="password"
                className="input focus:outline-none input-bordered rounded bg-white border-2 border-gray-100 focus:border-indigo-500"
                required
              />
            </div>
            <div className="form-control my-3">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs rounded  "
                />
                <span className="label-text">Remember me</span>
              </label>
            </div>
            <div className="form-control ">
              <button className="btn  text-white font-semibold uppercase bg-indigo-500">
                Login
              </button>
            </div>
            <div className=" flex justify-center  gap-2 mt-2 ">
              <p className="inline text-sm">New on our platform?</p>
              <p className="inline text-sm text-indigo-500"> Create an account </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
