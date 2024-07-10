import { Chip } from "@material-tailwind/react";
import React from "react";

export default function MemberStatusDetails() {
  return (
    <div className="card-body">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Status Details</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover">
              <th>1</th>
              <td>Application Received .No Application Fees</td>
              <td>2024-05-06 19:27:34</td>
              <td>
                <div className="w-max">
                  <Chip variant="ghost" size="sm" value="pending" />
                </div>
              </td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Application Received .No Application Fees</td>
              <td>2024-05-06 19:27:34</td>
              <td>
                <div className="w-max">
                  <Chip variant="ghost" size="sm" value="pending" />
                </div>
              </td>
            </tr>
            {/* row 3 */}
            <tr className="hover">
              <th>3</th>
              <td>Application Received .No Application Fees</td>
              <td>2024-05-06 19:27:34</td>
              <td>
                <div className="w-max">
                  <Chip variant="ghost" size="sm" value="pending" />
                </div>
              </td>{" "}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
