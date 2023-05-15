import React, { useEffect, useState } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaRegComment, FaComment } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import Tzuyu from "../assets/demo/download (1).png";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../features/services/postSlice";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [commentCount, setCommentCount] = useState(0);

  const excerpt = (text) => {
    const limit = 100;
    if (text.length > 100) {
      return text.substring(0, limit) + "....";
    }
    return text;
  };

  const handleGoDetail = (post) => {
    navigate(`post/${post.id}`);
    dispatch(addPost({ post: post }));
  };

  useEffect(() => {
    setCommentCount(Object.values(post.comments).length);
  })

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
            <span className=" font-bold text-sm">{post.email}</span>
            <span className=" text-xs">{post.timestamp}</span>
          </div>
        </div>
        <div className=" p-2 active:bg-slate-200 rounded-full ">
          <CiMenuKebab className=" text-2xl" />
        </div>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {post?.photos?.map((photo, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={photo}
                  className=" w-full object-cover h-[500px] border border-slate-200 cursor-pointer "
                  onClick={ () => handleGoDetail(post) }
                  alt=""
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className=" flex items-center justify-between my-2 text-2xl  ">
        <div className=" flex gap-1 justify-center items-center ">
          <div className=" flex justify-center items-center gap-1">
            <AiOutlineLike className="active:bg-slate-200 rounded-full cursor-pointer" />
            <span className=" text-sm ">5likes</span>
          </div>

          <div className=" flex justify-center items-center gap-1">
            <AiOutlineDislike className="active:bg-slate-200 rounded-full cursor-pointer" />
            <span className=" text-sm ">5dislikes</span>
          </div>
        </div>

        <div className=" flex justify-center items-center gap-1">
          <FaRegComment className="active:bg-slate-200 rounded-full cursor-pointer" onClick={ () => handleGoDetail(post) } />
          <span className=" text-sm ">{commentCount} comments</span>
        </div>
      </div>

      <p className="text-[15px]">{excerpt(post.text)}</p>
    </div>
  );
};

export default Post;
