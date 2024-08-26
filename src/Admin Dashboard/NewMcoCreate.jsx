import { Typography } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function NewMcoCreate() {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPassSame, setIsPassSame] = useState(true);
  const axiosPublic = useAxiosPublic();
  // const { createWithPass, loading, setLoading, signOutProfile } =
  //   useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // password show & hide
  const togglePasswordVisibility = (type) => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirmpass") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // mco create function
  const HandleMCO = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpass = form.confirmpass.value;

    if (password !== confirmpass) {
      setIsPassSame(false);
      setLoading(false);
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    axiosPublic
      .post("/admin/create-mco", data, {
        headers: {
          Authorization: `Bearer admin@gmail.com`,
        },
      })
      .then((res) => {
        console.log(res);
        swal("Congratulations!", res.data.message, "success");
        navigate("/admin/allMcoList");
        setLoading(false);
      })
      .catch((err) => {
        swal("Ops!", err.response.data.message, "error");
        setLoading(false);
      });
      setLoading(false);
    setIsPassSame(true);
  };

  return (
    <div className=" bg-white shadow-md rounded-md ">
      <div className="card-body border-b border-gray-200">
        <Typography variant="h5" color="blue-gray">
          Proceed to Add MCO
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter Details to Assign a New MCO
        </Typography>
      </div>

      {/* mco create form */}
      <form className="card-body" onSubmit={HandleMCO}>
        {/* row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-between items-center">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name *</span>
            </label>
            <input
              type="text"
              className="input input-bordered border focus:border-customPurple  focus:outline-0  border-gray-300 rounded-md"
              required
              name="firstName"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name *</span>
            </label>
            <input
              type="text"
              className="input input-bordered border focus:border-customPurple  focus:outline-0  border-gray-300 rounded-md"
              required
              name="lastName"
            />
          </div>
        </div>
        {/* row 2 */}
        <div className="grid grid-cols-1  gap-3 justify-between items-center">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email *</span>
            </label>
            <input
              type="email"
              className="input input-bordered border focus:border-customPurple  focus:outline-0  border-gray-300 rounded-md"
              required
              name="email"
            />
          </div>
        </div>
        {/* row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-between items-center">
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
              <span className="label-text text-black">Confirm Password *</span>
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
            <p className="text-red-700 ">&#10060; Passowrd doesn't match</p>
          )}
        </div>
        {/* submit button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn rounded-md bg-customPurple text-white font-medium"
          >
            {loading ? "Wait a Moment......" : "Assign a New MCO"}
          </button>
        </div>
      </form>
    </div>
  );
}
