import React, { useState } from "react";
import useStatus from "../../Hooks/useStatus";
import axios from "axios";

export default function Upload({ refetch, studentDetails }) {
  //   const { userinfo } = useStatus();

  return (
    <div className="p-5">
      {studentDetails?.canUpload && (
        <form action="/profile" method="post" enctype="multipart/form-data">
          <input
            type="file"
            name="ffff"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </form>
      )}
    </div>
  );
}
