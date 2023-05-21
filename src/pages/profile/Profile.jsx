import React, { useState, useEffect } from "react";
import t from "../../assets/demo/download (1).png";
import app from "../../firebase";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import PostList from "../../components/PostList";
import { useDispatch } from "react-redux";
import { addFirebase } from "../../features/services/firebaseSlice";

const Profile = () => {
  const storage = getStorage(app);
  const dispatch = useDispatch();
  const userSelector = useSelector((state)=>state?.auth?.user)
  const firebaseSelector = useSelector((state)=>state?.firebase)

  const handleFileSelectUI = () => {
    document.getElementById("imageUpload").click();
  };

  const handleFileSelect = (file) => {
    let random = Math.random() * 100000000000000000;
    const storageRef = ref(storage, "profile/" + random + file[0].name);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (downloadURL) {
            const nowInMilliseconds = Date.now();
            const now = new Date();
            const dateTimeString = now.toLocaleString();
            const data = {
              email : userSelector.email,
              userUid : userSelector.uid,
              username : '',
              profileImg : downloadURL,
              timestamp: dateTimeString,
            }
            dispatch(addFirebase({data, path: `profile/${nowInMilliseconds}` }));
            if(firebaseSelector.status == 1){
              console.log("success")
            }
          }
        });
      }
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" w-[50%] mx-auto flex flex-col gap-3 my-5 ">
      <div className=" flex justify-center ">
        <div className=" relative w-[200px] h-[200px] ">
          <img
            src={t}
            className="rounded-full object-cover w-[200px] h-[200px]  "
            alt=""
          />
          <input
            type="file"
            className=" hidden "
            id="imageUpload"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <span className=" absolute flex justify-center items-center  w-[40px] h-[40px] bg-slate-200 rounded-full bottom-1 right-5 cursor-pointer active:bg-slate-300  ">
            <FiEdit className=" text-xl" onClick={handleFileSelectUI} />
          </span>
        </div>
      </div>
      <div className=" flex flex-col items-center">
        <span className=" font-bold text-xl">Aung Paing Soe</span>
        <span className="">aps@gmail.com</span>
        <span className="">I'm a hero</span>
      </div>
      <div>
        <div>
          <div>
           <PostList page="profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
