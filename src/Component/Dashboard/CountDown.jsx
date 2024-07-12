/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const CountDown = ({ enrollmentStartDate, refetch }) => {
  const [timeLeft, setTimeLeft] = useState(null);

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
    return <span>To be paid</span>;
  }

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
