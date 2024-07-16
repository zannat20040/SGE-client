import React from "react";
import { PiStudent } from "react-icons/pi";

export default function StudentOfMco() {
  return (
    <div>
      <div className="bg-white rounded drop-shadow-md p-5">
        <div>
          <PiStudent className="text-4xl"/>
        </div>
        <div>
            <h1>Total Student</h1>
            <h1>7 people</h1>
        </div>
      </div>
    </div>
  );
}
