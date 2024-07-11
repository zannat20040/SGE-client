import React from "react";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import useDateFormatter from "../../Hooks/useDateFormatter";

export default function MemberStatusDetails({ studentDetails }) {
  const { formatDate } = useDateFormatter();

  return (
    <div className="flex flex-col gap-3 py-5 px-1">
      {studentDetails?.statusHistory
        ?.slice()
        .reverse()
        .map((history, index) => (
          <Card
            key={index}
            color="transparent"
            shadow={false}
            className="w-full shadow rounded  p-5"
          >
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex items-center gap-4 p-0 mt-0 rounded-none sm:flex-row flex-col-reverse"
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center justify-between">
                  <Typography color="blue-gray" className="text-sm">
                    {formatDate(history.createdAt)}
                  </Typography>
                </div>
                <Typography color="blue-gray" className="text-sm capitalize">
                  {history?.comment}
                </Typography>
              </div>
              <div className="w-full flex justify-start sm:justify-end">
                <div className="flex items-center justify-end">
                  <label className="btn btn-xs rounded text-customPurple text-sm bg-[#e5e2ff] font-light border-0">
                    {history.status}
                  </label>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
