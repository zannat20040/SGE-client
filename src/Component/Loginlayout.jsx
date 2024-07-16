import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Loginlayout({ HandleLogin, loading }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="  md:bg-[#f6f6f6] bg-white min-h-screen">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between  gap-0 md:gap-10">
        <div className="p-4 md:p-10  lg:col-span-2 ">
          <Logo color={"text-black"} />
          <div className="h-full hidden md:flex items-center justify-center px-10 w-full">
            <img
              src="https://st.depositphotos.com/1144687/1902/i/450/depositphotos_19024147-stock-photo-drawing-city-over-book.jpg"
              className="w-4/5 flex mx-auto"
            />
          </div>
        </div>
        <div className=" p-4 pt-36 md:p-10 md:pt-0  pb-16 card h-screen bg-white w-full  rounded-none">
         
          <h1 className="font-semibold text-2xl  md:mt-20 ">Welcome to Shabuj Global</h1>
          <p className="text-sm mt-2">
            {" "}
            Please sign-in to your account and start the adventure{" "}
          </p>
          <form className="mt-10 " onSubmit={HandleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                required
                name="email"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                  required
                  name="password"
                />
                <button
                  type="button"
                  className="absolute top-0 bottom-0 my-auto right-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
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
              <button className="btn  text-white font-medium uppercase bg-customPurple">
                {loading ? "Wait a momemt..." : "Login"}
              </button>
            </div>
          </form>
          <div className=" mt-2 text-center">
            <p className="inline text-sm">
              New on our platform?{" "}
              <Link className="inline text-sm text-customPurple" to={"/signup"}>
                Create an account
              </Link>
            </p>
          </div>
          <div className="flex justify-center mt-5 text-sm">
            <Link to={"/admin"}>
              <button className="text-customPurple">Or, Log in as Admin</button>
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
