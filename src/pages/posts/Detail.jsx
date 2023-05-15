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
import DefaultImage from "../../assets/image/image-default.png";
import Comment from "../../components/Comment";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const postSelector = useSelector((state) => state?.post?.post);
  const [post, setPost] = useState("");

  const getCurrentPost = () => {
    if (!postSelector) {
      setIsLoading(true);
      navigate("/");
    } else {
      setIsLoading(false);
      setPost(postSelector);
    }
  };

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
          <PostDetail post={post} />
        </>
      )}
    </div>
  );
};

function PostDetail({ post }) {
  return (
    <div className=" my-5 flex gap-3 ">
      <div className="w-[70%]">
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
              <div>
                <SwiperSlide key={index}>
                  <img
                    src={photo}
                    className="  h-[500px] object-cover mx-auto "
                    alt=""
                  />
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </div>
      <div className="w-[30%] flex gap-3 flex-col">
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
        <div>
          {post?.text}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam alias
          fuga optio blanditiis tenetur facere, sequi error sapiente, a saepe,
          quisquam cupiditate molestiae amet repellendus incidunt fugiat rerum
          sint inventore.
        </div>
        <div>
          <Comment/>
        </div>
      </div>
    </div>
  );
}

export default Detail;
