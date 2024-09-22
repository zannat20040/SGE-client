import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function SignupLayout({ HandleSignup, isPassSame, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmpass") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="   bg-white ">
      <div className=" p-4 md:p-10  pb-16 card h-full  w-full  rounded-none container mx-auto">
        <Logo color={"text-black"} />
        <h1 className="font-bold text-4xl mt-20 text-center">
          Welcome to Shabuj Global
        </h1>
        <p className=" mt-2 text-center">
          {" "}
          Please sign-up to your account and start the adventure{" "}
        </p>
        <form className="mt-10 " onSubmit={HandleSignup}>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 justify-between items-center">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">First Name *</span>
              </label>
              <input
                type="text"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                required
                name="firstName"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Last Name *</span>
              </label>
              <input
                type="text"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                required
                name="lastName"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-3 justify-between items-center">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email *</span>
              </label>
              <input
                type="email"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                required
                name="email"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Phone Number *</span>
              </label>
              <input
                type="number"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                required
                name="number"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Whatsapp Number</span>
              </label>
              <input
                type="number"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                name="wpnumber"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-between items-center mt-3">
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-black">Password *</span>
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
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-black">
                  Confirm Password *
                </span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input w-full focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                  required
                  name="confirmpass"
                />
                <button
                  type="button"
                  className="absolute top-0 bottom-0 my-auto right-5"
                  onClick={() => togglePasswordVisibility("confirmpass")}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {!isPassSame && (
              <p className="text-red-600 ">&#10060; Passowrd doesn't match</p>
            )}
          </div>

          <div className="form-control my-3">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                defaultChecked
                required
                className="checkbox checkbox-primary checkbox-xs rounded  "
              />
              <span className="label-text">
                I accept all terms & conditions
              </span>
            </label>
          </div>
          <div className="form-control ">
            <button className="btn  text-white font-medium uppercase bg-customPurple">
              {loading ? "Wait a Moment ... " : "Signup"}
            </button>
          </div>
        </form>
        <div className=" text-center mt-2">
          <p className="inline text-sm">
            Already Have an Account?{" "}
            <Link className="inline text-sm text-customPurple" to={"/"}>
              Go to your account
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
