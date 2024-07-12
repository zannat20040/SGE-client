import React from "react";
import FileUpload from "./FileUpload";
import Download from "./Download";
import useStatus from "../../Hooks/useStatus";

export default function Updown({studentDetails, refetch}) {
  const { userinfo } = useStatus();

  return (
    <div>
      {userinfo && userinfo === "mco" ? (
        <FileUpload studentDetails={studentDetails} refetch={refetch} />
      ) : (
        <Download studentDetails={studentDetails} refetch={refetch} />
      )}
    </div>
  );
}
