import React from "react";

const Comment = () => {
  return (
    <div>
      <form className="flex">
        <input
          type="text"
          className=" border border-slate-200 w-full rounded-sm p-2 "
        />
        <button className=" primary-btn">send</button>
      </form>
      <div className=" mt-4">
        <div className="flex flex-col">
           <span>comment one</span>
           <span>comment two</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
