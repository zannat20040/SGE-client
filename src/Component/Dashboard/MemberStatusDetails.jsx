import { Chip } from "@material-tailwind/react";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import useDateFormatter from "../../Hooks/useDateFormatter";

export default function MemberStatusDetails({ studentDetails }) {
  const { formatDate } = useDateFormatter();
  console.log(studentDetails?.statusHistory);

  return (
    <div className="flex flex-col gap-2 p-5">
      {studentDetails?.statusHistory?.slice().reverse().map((history) => (
        <Card
          color="transparent"
          shadow={false}
          className="w-full bg-gray-200 rounded border border-gray-300 p-5"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 p-0 mt-0 rounded-none"
          >
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography color="blue-gray" className="text-sm">
                  {formatDate(history.createdAt)}
                </Typography>
              </div>
              <Typography color="blue-gray" className="text-sm capitalize">
                {history?.comment}
              </Typography>
            </div>
            <div className="flex w-full flex-col gap-0.5">
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
