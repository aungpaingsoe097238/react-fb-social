import React, { useEffect, useState } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike
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
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/services/postSlice";
import app from "../firebase";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [commentCount, setCommentCount] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [reactionStatus, setReactionStatus] = useState(0);
  const database = getDatabase(app);
  const nowInMilliseconds = Date.now();
  const now = new Date();
  const dateTimeString = now.toLocaleString();
  const userSelector = useSelector((state) => state?.auth?.user);
  const [likeReactionCount, setLikeReactionCount] = useState(0);
  const [DisLikeReactionCount, setDisLikeReactionCount] = useState(0);

  const getReaction = async () => {
    const commentRef = ref(database, `posts/${post?.id}/reactions`);
    const snapshot = await get(commentRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setReactions(Object.values(data));
      const isSameUid = Object.values(data).filter(
        (reaction) => reaction.uid === userSelector.uid
      );
      setReactionStatus(isSameUid[0]?.status);
      setLikeReactionCount(
        Object.values(data).filter((reaction) => reaction.status === 1).length
      );
      setDisLikeReactionCount(
        Object.values(data).filter((reaction) => reaction.status === 0).length
      );
    } else {
      setReactionStatus(3);
    }
  };

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

  const handleGiveReaction = (post, status) => {
    const isSameEmail = reactions.filter(
      (reaction) => reaction.userUid === userSelector.uid
    );

    const isSameStatus = reactions.filter(
      (reaction) =>
        reaction.status == status && reaction.userUid === userSelector.uid
    );

    if (isSameStatus.length > 0) {
      sendReactionToFb(
        `posts/${post?.id}/reactions/${isSameEmail[0]?.id}`,
        {
          id: isSameEmail[0]?.id,
          status: 3,
          timestamp: dateTimeString,
          userUid: userSelector.uid,
          email: userSelector.email
        },
        "create reaction"
      );
      return;
    }

    if (isSameEmail.length > 0) {
      sendReactionToFb(
        `posts/${post?.id}/reactions/${isSameEmail[0]?.id}`,
        {
          id: isSameEmail[0]?.id,
          status: status,
          timestamp: dateTimeString,
          userUid: userSelector.uid,
          email: userSelector.email
        },
        "create reaction"
      );
    } else {
      sendReactionToFb(
        `posts/${post?.id}/reactions/${nowInMilliseconds}`,
        {
          id: nowInMilliseconds,
          status: status,
          timestamp: dateTimeString,
          userUid: userSelector.uid,
          email: userSelector.email
        },
        "update reaction"
      );
    }
  };

  const sendReactionToFb = (path, data, message) => {
    set(ref(database, `${path}`), data)
      .then(() => {
        console.log(message);
        getReaction();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setCommentCount(Object.values(post.comments).length);
    getReaction();
  }, [setReactions]);

  return (
    <div className=" my-3 mx-auto text-slate-700 ">
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
                  className=" w-full object-cover h-[500px] border border-slate-200 cursor-pointer "
                  onClick={() => handleGoDetail(post)}
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
            {reactionStatus === 1 ? (
              <AiFillLike
                className="active:bg-slate-200 rounded-full cursor-pointer"
                onClick={() => handleGiveReaction(post, 1)}
              />
            ) : (
              <AiOutlineLike
                className="active:bg-slate-200 rounded-full cursor-pointer"
                onClick={() => handleGiveReaction(post, 1)}
              />
            )}
            <span className=" text-sm "> {likeReactionCount} likes</span>
          </div>

          <div className=" flex justify-center items-center gap-1">
            {reactionStatus === 0 ? (
              <AiFillDislike
                className="active:bg-slate-200 rounded-full cursor-pointer"
                onClick={() => handleGiveReaction(post, 0)}
              />
            ) : (
              <AiOutlineDislike
                className="active:bg-slate-200 rounded-full cursor-pointer"
                onClick={() => handleGiveReaction(post, 0)}
              />
            )}
            <span className=" text-sm ">{DisLikeReactionCount} dislikes</span>
          </div>
        </div>

        <div className=" flex justify-center items-center gap-1">
          <FaRegComment
            className="active:bg-slate-200 rounded-full cursor-pointer"
            onClick={() => handleGoDetail(post)}
          />
          <span className=" text-sm ">{commentCount} comments</span>
        </div>
      </div>

      <p className="text-[15px]">{excerpt(post.text)}</p>
    </div>
  );
};

export default Post;
