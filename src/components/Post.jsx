import React from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Tzuyu from "../assets/demo/download (1).png"

const Post = ({ post }) => {

  const excerpt = (text) => {
    const limit = 100;
    if(text.length > 100){
      return text.substring(0,limit)+'....';
    }
    return text;
  }

  return (
    <div className=" my-3 w-[50%] mx-auto text-slate-700 ">
      <div className=" flex justify-between items-center ">
        <div className=" mb-2 flex justify-center items-center gap-1 ">
          <img
            src={Tzuyu}
            className=" object-cover w-[35px] h-[35px] rounded-full "
            alt=""
          />
          <div className=" flex flex-col justify-center ">
            <span className=" font-bold text-sm">{ post.email }</span>
            <span className=" text-xs">{ post.timestamp }</span>
          </div>
        </div>
        <div className=" p-2 active:bg-slate-200 rounded-full cursor-pointer  ">
          <CiMenuKebab className=" text-2xl" />
        </div>
      </div>
      <div>
        <img
          src={post.photos[0]}
          className=" w-full object-cover h-[500px] border border-slate-200 "
          alt=""
        />
      </div>
      <div className=" flex items-center justify-between my-2 text-2xl  ">
        <div className=" flex gap-1 justify-center items-center ">

          <div className=" flex justify-center items-center gap-1">
            <AiFillLike className="active:bg-slate-200 rounded-full cursor-pointer" />
            <span className=" text-sm ">5likes</span>
          </div>

          <div className=" flex justify-center items-center gap-1">
            <AiFillDislike className="active:bg-slate-200 rounded-full cursor-pointer" />
            <span className=" text-sm ">5dislikes</span>
          </div>
        </div>

        <div className=" flex justify-center items-center gap-1">
          <FaComment className="active:bg-slate-200 rounded-full cursor-pointer" />
          <span className=" text-sm ">5comments</span>
        </div>

      </div>
      <p className="text-[15px]">
        { excerpt(post.text) }
      </p>
    </div>
  );
};

export default Post;
