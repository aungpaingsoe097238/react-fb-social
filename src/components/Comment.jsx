import React, { useEffect, useState } from "react";
import T from "../assets/demo/download.png";
import app from "../firebase";
import { getDatabase, ref, set, get } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { addFirebase } from "../features/services/firebaseSlice";

const Comment = ({ post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const database = getDatabase(app);
  const userSelector = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const firebaseSelector = useSelector((state) => state?.firebase);

  const handleSendComment = (e) => {
    e.preventDefault();
    const nowInMilliseconds = Date.now();
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    const data = {
      id: nowInMilliseconds,
      text: comment,
      timestamp: dateTimeString,
      userUid: userSelector.uid,
      email: userSelector.email
    };
    dispatch(addFirebase({ data, path: `posts/${post?.id}/comments/${nowInMilliseconds}` }));
    if (firebaseSelector.status == 1) {
      setComment("");
    } else {
      console.log(error);
    }
  };

  const getAllComments = async () => {
    const commentRef = ref(database, `posts/${post?.id}/comments`);
    const snapshot = await get(commentRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setComments(Object.values(data).reverse());
    } else {
      console.log("No data available");
    }
  };

  useEffect(() => {
    getAllComments();
  });

  return (
    <div>
      <form className="flex" onSubmit={handleSendComment}>
        <input
          type="text"
          className=" border border-slate-200 w-full rounded-sm p-2 "
          placeholder="type comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className=" primary-btn">send</button>
      </form>
      <div className=" mt-4">
        <div className="flex flex-col gap-3">
          {comments?.map((comment) => {
            return (
              <div key={comment?.id} className=" flex gap-2 items-center">
                <img
                  src={T}
                  className=" w-[40px] h-[40px] rounded-full border border-slate-100 shadow-sm object-cover "
                  alt=""
                />
                <div className=" bg-slate-200 p-2 rounded-lg ">
                  <span className=" block text-xs text-slate-500 italic ">
                    from {comment?.email}
                  </span>
                  <span className=" block text-xs text-slate-500 italic ">
                    {comment?.timestamp}
                  </span>
                  <p className="my-2">{comment?.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comment;
