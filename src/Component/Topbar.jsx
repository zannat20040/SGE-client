import React, { useContext, useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useStatus from "../Hooks/useStatus";
import { CiDollar } from "react-icons/ci";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Tooltip } from "@material-tailwind/react";

export default function Topbar({ handleButtonClick }) {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const firstLetter = user?.displayName.trim().charAt(0).toUpperCase();
  const { userinfo } = useStatus();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (userinfo === "member") {
      axiosPublic
        .get(`/member/enrolled/${user?.email}`, {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          const reversedEnrollments = response.data.slice().reverse();

          let total = 0;
          for (let i = 0; i < reversedEnrollments.length; i++) {
            if (i < 4) {
              total += 300;
            } else {
              total += 400;
            }
          }
          setTotalAmount(total);
        })
        .catch((error) => {
          console.error("Error making GET request:", error);
        });
    }
  }, [axiosPublic, user, userinfo]);

  return (
    <div className="navbar bg-base-100 shadow-md  rounded-md mb-5    sticky top-0 z-[3]   ">
      <div className="md:justify-end justify-between flex items-center gap-5 w-full px-4 py-2">
        <div className=" flex md:hidden ">
          <FaBarsStaggered onClick={handleButtonClick} />
        </div>

        <div className="flex gap-5 items-center">
          <div className="form-control flex flex-col justify-end items-end gap-1">
            {userinfo && userinfo === "member" ? (
              <>
                <h1>{user?.displayName}</h1>
                <div className="flex justify-between gap-2 items-center relative">
                  <span className="text-yellow-700  font-bold">
                    {totalAmount}
                  </span>
                  <Tooltip
                    content={
                      <>
                        <p>
                          1. Member cannot withdraw funds before 90 days from
                          enrollment for each student.
                        </p>
                        <p>2. First 4 withdrawals are for $300 each</p>
                        <p>
                          3. Subsequent withdrawals are for $400 each
                        </p>
                        <p>
                          4. Withdrawals are subject to a penalty if the member
                          drops out of enrollment
                        </p>
                      </>
                    }
                    placement="bottom-start"
                    animation="shift"
                    className="rounded "
                    duration={200}
                  >
                    <button>
                      <CiDollar className="group text-2xl bg-yellow-800 text-white rounded-full cursor-pointer" />
                    </button>
                  </Tooltip>
                </div>
              </>
            ) : (
              <h1>{user?.displayName}</h1>
            )}
          </div>
          <div className="dropdown dropdown-end">
            <div className="avatar placeholder online">
              <div className="bg-customPurple text-neutral-content w-8 rounded-full">
                <span>{firstLetter}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
