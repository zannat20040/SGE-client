/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const CountDown = ({ enrollmentStartDate, refetch }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const enrollmentDate = new Date(enrollmentStartDate);
      // const timeDiff = 90 * 24 * 60 * 60 * 1000 - (now - enrollmentDate); // 90 days in milliseconds
      const timeDiff = 15 * 1000 - (now - enrollmentDate); // 15 seconds in milliseconds

      if (timeDiff > 0) {
        setTimeLeft(timeDiff);
      } else {
        refetch();
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const intervalId = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(intervalId);
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
