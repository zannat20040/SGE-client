import React, { useContext, useState, useRef, useEffect } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

export default function StatusModal({ id, student, refetchStudents, label }) {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


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

    try {
      const response = await axiosPublic.post(
        `/mco/change-status/${id}`,
        statusData,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      toast.success("Status updated successfully");
      refetchStudents();
      closeModal();
    } catch (error) {
      toast.error(error.response.data);
    }
  };


  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
  }, [modalOpen]);

  return (
    <>
    
      <label
        htmlFor={`my_modal_${id}`}
        className="p-2 rounded text-customPurple text-sm bg-[#e5e2ff] font-light w-fit cursor-pointer"
        style={{ zIndex: "99999999" }}
        onClick={openModal}
      >
        {label}
      </label>
      <input type="checkbox" id={`my_modal_${id}`} className="modal-toggle" />
      {modalOpen && (
        <div className="modal" role="dialog" style={{ zIndex: "100000000" }}>
          <div className="modal-box rounded-md lg:translate-x-10 md:translate-x-32 md:w-2/4 w-3/4" ref={modalRef}>
            <h3 className="text-lg font-bold mb-8 text-center">
              Change status for {student?.firstName + " " + student?.lastName}
            </h3>
            <form className="flex flex-col gap-2" onSubmit={(e) => HandleStatus(e, id)}>
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
          <label className="modal-backdrop" htmlFor={`my_modal_${student?._id}`} onClick={closeModal}>
            Close
          </label>
        </div>
      )}
    </>
  );
}
