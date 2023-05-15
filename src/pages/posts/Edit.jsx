import React, { useEffect, useState } from "react";
import PhotoUpload from "../../components/PhotoUpload";
import app from "../../firebase";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addPhotos } from "../../features/services/photoSlice";
import {
  getDatabase,
  ref,
  set,
  child,
  push,
  update,
  get
} from "firebase/database";
import Loading from "../../components/Loading";

const Edit = () => {
  const params = useParams();
  const postSelector = useSelector((state) => state?.post?.post);
  const photoSelector = useSelector((state) => state?.photo?.photoUrls);
  const [post, setPost] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const database = getDatabase(app);
  const [spinner, setSpinner] = useState(true);

  const getCurrentPost = () => {
    if (!postSelector) {
      navigate("/");
    } else {
      setPost(postSelector);
      setText(postSelector?.text);
      dispatch(addPhotos({ photoUrls: [...postSelector?.photos] }));
    }
  };

  useEffect(() => {
    if ([...photoSelector].length > 0) {
      setSpinner(false);
    } else {
      setSpinner(true);
    }
  });

  useEffect(() => {
    getCurrentPost();
  }, []);

  const handlePostUpdate = (e) => {
    e.preventDefault();
    const editPost = {
      id: post?.id,
      text: text,
      timestamp: post?.timestamp,
      userUid: post?.userUid,
      email: post?.email,
      photos: photoSelector,
      comments: post?.comments,
    };

    set(ref(database, `posts/${post.id}`), editPost)
      .then(() => {
        setText("");
        dispatch(addPhotos({ photoUrls: [] }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="w-full text-slate-700 lg:w-[50%] mx-auto">
        <div className=" my-2 ">Edit a Post</div>
        <form onSubmit={handlePostUpdate}>
          <textarea
            rows="5"
            placeholder=" type here ... "
            className=" border border-slate-500 rounded-lg w-full p-2 "
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          {/* Image upload here */}
          <PhotoUpload />
          <div className=" my-2 ">
            <button
              type="submit"
              className={
                spinner
                  ? "float-right primary-btn flex justify-center items-center gap-1 opacity-50 cursor-not-allowed"
                  : "float-right primary-btn flex justify-center items-center gap-1"
              }
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
