import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import swal from "sweetalert";

export default function NewMember() {
  const { user, loading, setLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  // const adminEmail = "riad@gmail.com";

  const HandleNewMemberAdd = (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const primaryMobileNumber = form.primeNumber.value;
    const whatsappNumber = form.wpnumber.value;
    const preferredUniversity = form.preferredUni.value;
    const preferredCourse = form.preferredCourses.value;
    const createdBy = user?.email;

    const data = {
      firstName,
      lastName,
      email,
      primaryMobileNumber,
      whatsappNumber,
      preferredUniversity,
      preferredCourse,
      createdBy,
    };

    axiosPublic
      .post("/member/student-registration", data, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      })
      .then((res) => {
        swal(
          "Congratulation!",
          "One student has been added successfully!",
          "success"
        );
        setLoading(false);
      })
      .catch((error) => {
        swal("Opps!", error.message, "error");
        setLoading(false);
      });
  };

  return (
    <form
      className="card-body bg-white shadow-md rounded-md "
      onSubmit={HandleNewMemberAdd}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-between items-center">
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered border focus:border-customPurple focus:border-2 focus:outline-0  border-gray-300 rounded-md"
            required
            name="firstName"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered border focus:border-customPurple focus:border-2 focus:outline-0  border-gray-300 rounded-md"
            required
            name="lastName"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-between items-center">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered border focus:border-customPurple focus:border-2 focus:outline-0  border-gray-300 rounded-md"
            required
            name="email"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Primary Phone Number</span>
          </label>
          <input
            type="number"
            className="input input-bordered border focus:border-customPurple focus:border-2 focus:outline-0  border-gray-300 rounded-md"
            required
            name="primeNumber"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Whatsapp Number</span>
          </label>
          <input
            type="number"
            className="input input-bordered border focus:border-customPurple focus:border-2 focus:outline-0  border-gray-300 rounded-md"
            required
            name="wpnumber"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2  gap-8 sm:gap-5 md:gap-8 lg:gap-5 justify-between items-center">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Preferred Courses</span>
          </label>
          <select
            className="select select-bordered w-full rounded-md focus:outline-none"
            required
            name="preferredCourses"
          >
            <option>Computer Science</option>
            <option>Business Administration (MBA)</option>
            <option>Medicine</option>
            <option>Finance</option>
            <option>International Relations</option>
            <option>Data Science</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Preferred University</span>
          </label>
          <select
            className="select select-bordered w-full rounded-md focus:outline-none"
            required
            name="preferredUni"
          >
            <option>Harvard University</option>
            <option>Stanford University</option>
            <option>University of Oxford</option>
            <option>Massachusetts Institute of Technology (MIT)</option>
            <option>University of Cambridge</option>
          </select>
        </div>
      </div>
      <div className="form-control mt-6">
        <button className="btn rounded-md bg-customPurple text-white font-medium">
          {loading ? "Wait a Moment" : "Add This Member"}
        </button>
      </div>
    </form>
  );
}
