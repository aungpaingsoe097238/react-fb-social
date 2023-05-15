import React from "react";
import T from "../assets/demo/download.png";

const Comment = () => {
  return (
    <div>
      <form className="flex">
        <input
          type="text"
          className=" border border-slate-200 w-full rounded-sm p-2 "
          placeholder="type comment here..."
        />
        <button className=" primary-btn">send</button>
      </form>
      <div className=" mt-4">
        <div className="flex flex-col gap-3">

          <div className=" flex gap-2 items-center">
            <img
              src={T}
              className=" w-[40px] h-[40px] rounded-full border border-slate-100 shadow-sm object-cover "
              alt=""
            />
            <div className=" bg-slate-200 p-2 rounded-lg ">
                <span className=" text-xs block italic"> from aung paing soe </span>
                comment one
            </div>
          </div>

          <div className=" flex gap-2 items-center">
            <img
              src={T}
              className=" w-[40px] h-[40px] rounded-full border border-slate-100 shadow-sm object-cover "
              alt=""
            />
            <div className=" bg-slate-200 p-2 rounded-lg ">
                comment one
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Comment;
