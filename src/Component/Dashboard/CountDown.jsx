/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const CountDown = ({ enrollmentStartDate, refetch, createdBy }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [willBePaid, setWillBePaid] = useState(0);

  useEffect(() => {
    let intervalId;

    const calculateTimeLeft = () => {
      const now = new Date();
      const enrollmentDate = new Date(enrollmentStartDate);
      const timeDiff = enrollmentDate.getTime() + 15 * 1000 - now.getTime(); // 15 seconds in milliseconds

      if (timeDiff > 0) {
        setTimeLeft(timeDiff);
      } else {
        clearInterval(intervalId); // Stop interval when timeLeft is null or negative
        refetch(); // Fetch updated payment status

        axiosPublic
          .get(`/member/enrolled/${createdBy}`, {
            headers: {
              Authorization: `Bearer ${user?.email}`,
            },
          })
          .then((response) => {
            console.log("GET request response:", response.data);
            setWillBePaid(response?.data?.length);
            // Handle response data as needed
          })
          .catch((error) => {
            console.error("Error making GET request:", error);
            // Handle error if needed
          });
      }
    };

    // Clear previous interval if enrollmentStartDate changes
    clearInterval(intervalId);

    if (enrollmentStartDate) {
      calculateTimeLeft(); // Calculate initially

      // Start interval only if enrollmentStartDate is valid and status is enrolled
      intervalId = setInterval(calculateTimeLeft, 1000); // Update every second
    }

    return () => clearInterval(intervalId); // Cleanup interval on unmount or when enrollmentStartDate changes
  }, [enrollmentStartDate, refetch]);

  if (!timeLeft) {
    return <span>{willBePaid >= 5 ? "400$" : "300$"}</span>;
  }

  console.log(willBePaid);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      {days}d {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default CountDown;
