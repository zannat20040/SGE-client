/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function CountdownForMCO({
  enrollmentStartDate,
  refetch,
  paymentStatus,
}) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    let intervalId;

    const calculateTimeLeft = () => {
      const now = new Date();
      const enrollmentDate = new Date(enrollmentStartDate);
      const timeDiff = enrollmentDate.getTime() + 15 * 1000 - now.getTime();

      if (timeDiff > 0) {
        setTimeLeft(timeDiff);
      } else {
        clearInterval(intervalId);
        refetch();
      }
    };

    // Clear previous interval if enrollmentStartDate changes
    clearInterval(intervalId);

    if (enrollmentStartDate) {
      calculateTimeLeft();

      intervalId = setInterval(calculateTimeLeft, 1000);
    }

    return () => clearInterval(intervalId);
  }, [enrollmentStartDate, refetch]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      {!timeLeft ? (
        <span className="text-customPurple font-bold">${paymentStatus}</span>
      ) : (
        <span className="countdown font-mono text-xl">
          <span style={{ "--value": days }}></span>:
          <span style={{ "--value": hours }}></span>:
          <span style={{ "--value": minutes }}></span>:
          <span style={{ "--value": seconds }}></span>
        </span>
      )}
    </div>
  );
}
