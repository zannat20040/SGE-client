import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

export default function NewMember() {
  const HandleNewMemberAdd = (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const primeNumber = form.primeNumber.value;
    const wpnumber = form.wpnumber.value;
    const preferredUni = form.preferredUni.value;
    const preferredCourses = form.preferredCourses.value;

    const data = {
      firstName,
      lastName,
      email,
      primeNumber,
      wpnumber,
      preferredUni,
      preferredCourses,
    };

    console.log(data);
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
            placeholder="text"
            className="input input-bordered border focus:border-indigo-500 focus:border-2 focus:outline-0  border-gray-300 "
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
            placeholder="email"
            className="input input-bordered border focus:border-indigo-500 focus:border-2 focus:outline-0  border-gray-300 "
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
            placeholder="email"
            className="input input-bordered border focus:border-indigo-500 focus:border-2 focus:outline-0  border-gray-300 "
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
            placeholder="email"
            className="input input-bordered border focus:border-indigo-500 focus:border-2 focus:outline-0  border-gray-300 "
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
            placeholder="email"
            className="input input-bordered border focus:border-indigo-500 focus:border-2 focus:outline-0  border-gray-300 "
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
            className="select select-bordered w-full "
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
            className="select select-bordered w-full "
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
        <button className="btn rounded-md bg-indigo-400 text-white">
          Add this member
        </button>
      </div>
    </form>
  );
}
