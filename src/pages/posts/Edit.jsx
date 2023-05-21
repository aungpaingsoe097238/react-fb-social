import React, { useEffect, useState } from "react";
import PhotoUpload from "../../components/PhotoUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addPhotos } from "../../features/services/photoSlice";
import { addFirebase } from "../../features/services/firebaseSlice";
import Swal from "sweetalert2";

const Edit = () => {
  const postSelector = useSelector((state) => state?.post?.post);
  const photoSelector = useSelector((state) => state?.photo?.photoUrls);
  const firebaseSelector = useSelector((state) => state?.firebase);
  const [post, setPost] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const data = {
      id: post?.id,
      text: text,
      timestamp: post?.timestamp,
      userUid: post?.userUid,
      email: post?.email,
      photos: photoSelector,
      comments: post?.comments,
    };
    dispatch(addFirebase({ data, path: `posts/${post.id}` }));
    if (firebaseSelector.status == 1) {
      setText("");
      dispatch(addPhotos({ photoUrls: [] }));
      navigate(`/`);
      Alert('success','Post Edit Successfully.')
    } else {
      Alert('error','Something was wrong.')
    }
  };

  const Alert = (icon, title) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: icon,
      title: title
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
