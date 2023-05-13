import React, { useEffect, useState } from "react";
import app from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { GrAddCircle } from "react-icons/gr";
import PhotoUpload from "../../components/PhotoUpload";
import { useDispatch, useSelector } from "react-redux";
import photoSlice, { addPhotos } from "../../features/services/photoSlice";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
  const uuid = uuidv4();;
  const database = getDatabase(app);
  const [text, setText] = useState("");
  const [spinner, setSpinner] = useState(true);
  const dispatch = useDispatch();
  const photoSelector = useSelector((state) => state?.photo?.photoUrls);
  const userSelector = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    if ([...photoSelector].length > 0) {
      setSpinner(false);
    }else{
      setSpinner(true)
    }
  });

  // Post Create
  const handlePostCreate = (e) => {
    setSpinner(true);
    e.preventDefault();
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    const newPost = {
      text: text,
      timestamp: dateTimeString,
      uid: userSelector.uid,
      email: userSelector.email,
      photos: photoSelector,
    };
    set(ref(database, `posts/post_${uuid}`), newPost)
      .then(() => {
        setSpinner(false);
        Alert('success', 'New Post Create Successfully!')
        setText("")
        dispatch(addPhotos({ photoUrls : [] }));
      })
      .catch((error) => {
        setSpinner(false);
        Alert('error', 'Something Was Wrong!')
      });
  };

  const Alert = (icon,title) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: title,
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
          value={ text }
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
