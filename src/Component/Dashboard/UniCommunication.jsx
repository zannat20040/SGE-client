import React, { useContext, useState } from "react"; // Import useState
import CommunicationDetails from "./CommunicationDetails";
import useStatus from "../../Hooks/useStatus";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

export default function UniCommunication({ studentDetails, refetch }) {
  const { userinfo } = useStatus();
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  
  // Add a loading state
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true); // Set loading to true when the request starts
      const response = await axiosPublic.post(
        `/mco/university-communication/${studentDetails?._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      form.reset();
      toast.success(response?.data?.message);
      refetch(); // Make sure to call refetch to update the data
    } catch (error) {
      toast.error(error.response?.data || "Something went wrong");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="pt-8">
      {userinfo && userinfo === "mco" && (
        <form
          onSubmit={HandleUniCommunication}
          action=""
          className="grid grid-cols-2 lg:grid-cols-6 gap-3 justify-between items-center mb-6"
        >
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
          <button 
            className="btn border-0 bg-customPurple rounded focus:outline-none text-white font-normal" 
            disabled={loading} // Disable the button if loading
          >
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
