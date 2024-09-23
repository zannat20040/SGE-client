import React, { useContext, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

export default function Modal({ id, student, refetch }) {
  const [openModal, setOpenModal] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const allowedStatuses = [
    "application processing",
    "application submitted",
    "pending doc's",
    "offer issue conditional",
    "offer issue unconditional",
    "need payment",
    "case Issued",
    "additional doc needed",
    "refund required",
    "application rejected",
    "session expired",
    "doc received",
    "partial payment",
    "enrollment",
    "dropout",
  ];

  const HandleStatus = async (e, id) => {
    e.preventDefault();

    const form = e.target;
    const status = form.selectedValue.value;
    const comment = form.comment.value;

    const statusData = {
      status,
      comment,
    };

    axiosPublic
      .post(`/mco/change-status/${id}`, statusData, {
        headers: {
          Authorization: `Bearer ${user?.email}`,
        },
      })
      .then((res) => {
        toast.success("Status updated successfully");
        setOpenModal(false);
        refetch();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data);
      });
  };

  return (
    <div className="">
      <button
        onClick={() => setOpenModal(true)}
        className={`p-1  px-4 rounded text-sm font-semibold ${
          student?.status?.status === "application processing"
            ? "text-orange-600 bg-orange-50"
            : student?.status?.status === "application submitted"
            ? "text-cyan-600 bg-cyan-50"
            : student?.status?.status === "dropout"
            ? "text-red-600 bg-red-50 "
            : student?.status?.status === "enrollment"
            ? "bg-green-50 text-green-600"
            : "bg-[#cfcbf580] text-customPurple"
          }    font-light w-fit cursor-pointer`}
      >
        {student?.status?.status}
      </button>
      <div
        onClick={() => setOpenModal(false)}
        className={`lg:pl-[15%] md:pl-[30%] pb-0 fixed z-[1000] flex items-center justify-center ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={` absolute min-w-sm lg:w-4/12 md:w-5/12 w-auto rounded-lg bg-white p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${
            openModal
              ? "scale-1 opacity-1 duration-300"
              : "scale-0 opacity-0 duration-150"
          }`}
        >
          <h3 className="text-lg font-bold mb-8 text-center">
            Change status for {student?.firstName + " " + student?.lastName}
          </h3>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => HandleStatus(e, id)}
          >
            <div className="form-control">
              <select
                name="selectedValue"
                required
                className="select select-primary border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Current Status
                </option>
                {allowedStatuses?.map((selectedOption, index) => (
                  <option key={index} value={selectedOption}>
                    {selectedOption}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <input
                type="textarea"
                className="input focus:outline-none input-bordered rounded bg-white border border-gray-300 focus:border-indigo-500"
                placeholder="Write here a comment"
                name="comment"
              />
            </div>
            <div className="form-control">
              <button className="btn text-white font-medium uppercase bg-customPurple">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
