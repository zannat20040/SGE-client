import React from "react";

export default function Comment() {
  return (
    <div>
      <div className="card-body">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="avatar  placeholder online">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span>SY</span>
              </div>
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">10/07/24</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="avatar  placeholder online">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span>SY</span>
              </div>
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">10/0</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Recived at 12:46</div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 mt-10 p-5">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full border focus:border-indigo-500 border-gray-300 focus:outline-0 "
        />{" "}
        <button className="btn bg-indigo-500 text-white">Send</button>
      </div>
    </div>
  );
}
