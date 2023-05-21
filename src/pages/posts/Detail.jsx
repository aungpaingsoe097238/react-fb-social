import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import Post from "../../components/Post";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper";
import Comment from "../../components/Comment";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../../features/services/postSlice";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const postSelector = useSelector((state) => state?.post?.post);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();

  const getCurrentPost = () => {
    if (!postSelector) {
      setIsLoading(true);
      navigate("/");
    } else {
      setIsLoading(false);
      setPost(postSelector);
    }
  };

  const handleGoEdit = (post) => {
    navigate(`/post-edit/${post?.id}`);
    dispatch(addPost({ post : post }))
  }

  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <div className=" w-[80%] mx-auto">
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {/* post detail */}
          <div className=" my-10 flex gap-3 ">
            <div className="w-[70%]">
              <Swiper
                slidesPerView={1}
                pagination={{
                  type: "fraction"
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
                        className="  h-[500px] object-cover mx-auto "
                        alt=""
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="w-[30%] flex gap-3 flex-col">
              <div className=" flex items-center justify-between ">
                <div className=" flex gap-2 items-center">
                  <img
                    src={post?.photos[0]}
                    className=" w-[40px] h-[40px] rounded-full border border-slate-100 shadow-sm object-cover "
                    alt=""
                  />
                  <div className=" flex flex-col ">
                    <div className=" text-sm font-bold">{post.email}</div>
                    <div className=" text-xs">{post.timestamp}</div>
                  </div>
                </div>
                  <div className=" p-2 active:bg-sky-100 rounded-full" onClick={ () => handleGoEdit(post) }>
                    <FaRegEdit className=" text-2xl cursor-pointer " />
                  </div>
              </div>
              <div>{post?.text}</div>
              <div>
                <Comment post={post} />
              </div>
            </div>
          </div>
          {/* end post detail */}
        </>
      )}
    </div>
  );
};

export default Detail;
