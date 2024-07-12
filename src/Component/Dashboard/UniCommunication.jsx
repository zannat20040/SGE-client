import React, { useContext } from "react";
import CommunicationDetails from "./CommunicationDetails";
import useStatus from "../../Hooks/useStatus";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function UniCommunication({ studentDetails, refetch }) {
  const { userinfo } = useStatus();
  const { user, loading, setLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // const ourUniversity = [
  //   "University of Cambridge",
  //   "Massachusetts Institute of Technology (MIT)",
  //   "University of Oxford",
  //   "Stanford University",
  //   "Harvard University",
  // ];

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

    return formattedDate;
  };

  const HandleUniCommunication = async (e) => {
    e.preventDefault();
    const form = e.target;
    const date = formatDate(form.date.value);
    const subject = form.subject.value;
    const from = form.from.value;
    const data = {
      date,
      subject,
      from,
    };

    console.log(data);

    try {
      const response = await axiosPublic.post(
        `/mco/university-communication/${studentDetails?._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      refetch
      toast.success(response?.data?.message);
      refetch();
    } catch (error) {
      console.log(error);
    }

    form.reset();
  };

  return (
    <div className="pt-8">
      {userinfo && userinfo === "mco" && (
        <form
          onSubmit={HandleUniCommunication}
          action=""
          className="grid grid-cols-6 gap-3 justify-between items-center mb-6"
        >
          {/* <div className="form-control col-span-2">
            <select
              name="selectedValue"
              required
              className="select select-primary border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                From
              </option>
              {ourUniversity?.map((selectedOption, index) => (
                <option key={index} value={selectedOption}>
                  {selectedOption}
                </option>
              ))}
            </select>
          </div> */}
          <input
            type="text"
            name="from"
            required
            value={studentDetails?.preferredUniversity}
            disabled
            className="input border col-span-2 rounded border-gray-300 focus:outline-none focus:border-customPurple"
            placeholder="From"
          />
          <input
            type="text"
            name="subject"
            required
            className="input border col-span-2 rounded border-gray-300 focus:outline-none focus:border-customPurple"
            placeholder="Subject"
          />
          <input
            type="date"
            name="date"
            required
            className="input border border-gray-300 rounded focus:outline-none focus:border-customPurple"
            placeholder="date"
          />
          <button className="btn border-0 bg-customPurple rounded focus:outline-none text-white font-normal">
            {loading ? "Adding.." : "Add this"}
          </button>
        </form>
      )}

      <div>
        <CommunicationDetails
          studentDetails={studentDetails}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
