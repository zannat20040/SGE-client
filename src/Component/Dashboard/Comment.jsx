import React, { useContext, useState } from "react"; // Import useState
import { MdOutlineSubject } from "react-icons/md";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useDateFormatter from "../../Hooks/useDateFormatter";

export default function Comment({ studentDetails, refetch }) {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { formatDate } = useDateFormatter();
  
  // Add a loading state
  const [loading, setLoading] = useState(false);

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
      setLoading(true); // Set loading to true when the request starts
      const response = await axiosPublic.post(
        `/mco/comments/${studentDetails?._id}`,
        sendedComment,
        {
          headers: {
            Authorization: `Bearer ${user?.email}`,
          },
        }
      );
      toast.success("Comment sent successfully");
      refetch();
      // Clear the form fields
      form.reset();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div>
      <div className="py-5 px-1 flex flex-col gap-2">
        {studentDetails?.comments?.length > 0 &&
          studentDetails?.comments?.map((comment, index) => (
            <div
              key={index}
              className={`flex ${
                user?.displayName === comment?.commentedByEmail
                  ? "justify-end"
                  : ""
              }`}
            >
              <div className="bg-gray-100 rounded-md w-5/6 lg:w-4/6 ">
                <div className="px-5 py-2 border-b-2 border-gray-200 gap-5 flex justify-between flex-wrap md:items-center items-start xs:flex-row flex-col-reverse">
                  <p className="font-semibold ">{comment?.subject}</p>
                  <div className="flex flex-col-reverse xs:items-end items-start ">
                    <p className="text-xs text-gray-600">
                      {`${formatDate(comment?.createdAt)?.date} | ${
                        formatDate(comment?.createdAt)?.time
                      }`}
                    </p>
                    <p className="text-sm">{comment?.commentedByEmail}</p>
                  </div>
                </div>
                <div className="px-5 py-2">{comment?.comment}</div>
              </div>
            </div>
          ))}
      </div>

      <form
        className="flex flex-col py-5 px-1 rounded-md"
        onSubmit={HandleComment}
      >
        <div className="">
          <label className="p-3 bg-white rounded-t-md text-customPurple flex items-center gap-2 border border-gray-300 rounded-b-none outline-0">
            Subject
            <input
              required
              type="text"
              className="grow outline-none w-full text-black"
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
        <button 
          className="btn bg-customPurple font-medium text-white rounded-md" 
          disabled={loading} // Disable the button if loading
        >
          {loading ? "Sending..." : "Send"} 
        </button>
      </form>
    </div>
  );
}
