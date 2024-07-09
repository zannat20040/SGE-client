import React from "react";
import { FaLeaf } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function SignupLayout({ HandleSignup, isPassSame, loading }) {
  return (
    <div className="   bg-white ">
      <div className=" p-4 md:p-10  pb-16 card h-full  w-full  rounded-none container mx-auto">
        <Logo color={'text-black'}/>
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
              <input
                type="password"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                required
                name="password"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-black">
                  Confirm Password *
                </span>
              </label>
              <input
                type="password"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-200 focus:border-indigo-500"
                required
                name="confirmpass"
              />
            </div>
            {!isPassSame && (
              <p className="text-red-700 ">&#10060; Passowrd doesn't match</p>
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
            <button className="btn  text-white font-medium uppercase bg-indigo-500">
              {loading ? "Wait a Moment ... " : "Signup"}
            </button>
          </div>
        </form>
        <div className=" text-center mt-2">
          <p className="inline text-sm">
            Already Have an Account?{" "}
            <Link className="inline text-sm text-indigo-500" to={"/"}>
              Go to your account
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
