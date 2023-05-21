import React, { useEffect, useState } from "react";
import PhotoUpload from "../../components/PhotoUpload";
import { useDispatch, useSelector } from "react-redux";
import photoSlice, { addPhotos } from "../../features/services/photoSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { addPost } from "../../features/services/postSlice";
import { addFirebase } from "../../features/services/firebaseSlice";

const Create = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [spinner, setSpinner] = useState(true);
  const dispatch = useDispatch();
  const photoSelector = useSelector((state) => state?.photo?.photoUrls);
  const userSelector = useSelector((state) => state?.auth?.user);
  const firebaseSelector = useSelector((state)=>state?.firebase)
  const utliSelector = useSelector((state)=>state?.utli)

  useEffect(() => {
    dispatch(addPost({ post: [] }));
    dispatch(addPhotos({ photoUrls: [] }));
  }, []);

  useEffect(() => {
    if ([...photoSelector].length > 0) {
      setSpinner(false);
    } else {
      setSpinner(true);
    }
  });

  // Post Create
  const handlePostCreate = (e) => {
    setSpinner(true);
    e.preventDefault();
    const data = {
      id: utliSelector.nowInMilliseconds,
      text: text,
      timestamp: utliSelector.dateTimeString,
      userUid: userSelector.uid,
      email: userSelector.email,
      photos: photoSelector,
      comments: "",
    };
    dispatch(addFirebase({data, path: `posts/${nowInMilliseconds}` }));
    if(firebaseSelector.status == 1){
      setSpinner(false);
      Alert("success", "New Post Create Successfully!");
      setText("");
      dispatch(addPhotos({ photoUrls: [] }));
      navigate("/");
    }else{
      setSpinner(false);
      Alert("error", "Something Was Wrong!");
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
    <div className="w-full text-slate-700 lg:w-[50%] mx-auto">
      <div className=" my-2 ">Create a Post</div>
      <form onSubmit={handlePostCreate}>
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
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
