import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export default function CountdownForMCO({
  enrollmentStartDate,
  refetch,
  createdBy,
}) {
  const [timeLeft, setTimeLeft] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [willBePaid, setWillBePaid] = useState(0);

  useEffect(() => {
    let intervalId;

    const calculateTimeLeft = () => {
      const now = new Date();
      const enrollmentDate = new Date(enrollmentStartDate);
      const timeDiff = enrollmentDate.getTime() + 10 * 1000 - now.getTime();

      if (timeDiff > 0) {
        setTimeLeft(timeDiff);
      } else {
        clearInterval(intervalId);

        axiosPublic
          .get(`/member/enrolled/${createdBy}`, {
            headers: {
              Authorization: `Bearer ${user?.email}`,
            },
          })
          .then((response) => {
            refetch();
            const numberOfEnrollments = response.data.slice().reverse();
            
            if (numberOfEnrollments.length <= 4) {
              setWillBePaid(300); 
            } else {
              setWillBePaid(400); 
            }

            setTimeLeft(null);
          })
          .catch((error) => {
            console.error("Error making GET request:", error);
          });
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
        <span className="text-customPurple font-bold">${willBePaid}</span>
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
