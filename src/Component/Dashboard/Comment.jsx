import React, { useContext } from "react";
import { MdOutlineSubject } from "react-icons/md";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useDateFormatter from "../../Hooks/useDateFormatter";

export default function Comment({ studentDetails, refetch }) {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { formatDate } = useDateFormatter();

  const HandleComment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const comment = form.comment.value;
    const commentedByEmail = user?.displayName;

    const sendedComment = {
      subject,
      comment,
      commentedByEmail,
    };

    try {
      const response = await axiosPublic.post(
        `/mco/comments/${studentDetails?._id}`,
        sendedComment,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      toast.success("Comment sended succesfully");
      refetch();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="p-5 flex flex-col gap-2">
        {studentDetails?.comments?.length > 0 &&
          studentDetails?.comments?.map((comment) => (
            <div
              className={`flex ${
                user?.displayName === comment?.commentedByEmail
                  ? "justify-end"
                  : ""
              }`}
            >
              <div className="bg-[#e5e2ff]  rounded-md w-4/6 ">
                <div className="px-5 py-2 border-b border-[#d3d0ea]  flex justify-between">
                  <div className="flex gap-2 items-center">
                    <p>{comment?.commentedByEmail}</p>
                    <p className="text-xs">
                      ({formatDate(comment?.createdAt)})
                    </p>
                  </div>
                  <p className="text-sm">{comment?.subject}</p>
                </div>
                <div className="px-5 py-2">{comment?.comment}</div>
              </div>
            </div>
          ))}
      </div>

      <form
        className="flex flex-col p-5 bg-gray-100 rounded-md"
        onSubmit={HandleComment}
      >
        <div className="">
          <label className="p-3 bg-white rounded-t-md flex items-center gap-2 border border-gray-300 rounded-b-none outline-0">
            Subject
            <input
              required
              type="text"
              className="grow outline-none w-full"
              placeholder="example"
              name="subject"
            />
          </label>
          <textarea
            required
            name="comment"
            className="textarea border border-gray-300 focus:outline-none rounded-t-none border-t-0 w-full"
            placeholder="Write here your comment........."
          ></textarea>
        </div>
        <button className="btn bg-customPurple font-medium text-white rounded-md">
          Send
        </button>
      </form>
    </div>
  );
}
