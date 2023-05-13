import React, { useState } from "react";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ImageDefault from "../assets/demo/download.png";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addPhotos } from "../features/services/photoSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { RiCloseFill } from "react-icons/ri";

const PhotoUpload = () => {
  const storage = getStorage(app);
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const photoSelector = useSelector((state) => state?.photo?.photoUrls);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleRemovePhoto = (currentPhoto) => {
    const notRemovePhotos = photoSelector.filter(
      (photo) => photo !== currentPhoto
    );
    dispatch(addPhotos({ photoUrls: notRemovePhotos }));
  };

  const handleFileSelectUI = () => {
    document.getElementById("imageUpload").click();
  };

  const handleFileSelect = (files) => {
    setSpinner(true);
    let promises = [];
    let FileArray = [...files];
    FileArray.forEach((file) => {
      let random = Math.random() * 100000000000000000;
      const storageRef = ref(storage, "posts/" + random + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const promise = new Promise((resolve, reject) => {
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
                resolve(downloadURL);
              }
            });
          }
        );
      });
      promises.push(promise);
    });

    Promise.all(promises)
      .then((downloadURLs) => {
        dispatch(addPhotos({ photoUrls: downloadURLs }));
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
      });
  };

  return (
    <div>
      <div className=" my-2 italic text-sm">Upload post image here</div>
      <div className=" hidden">
        <input
          type="file"
          id="imageUpload"
          onChange={(e) => handleFileSelect(e.target.files)}
          multiple
        />
      </div>
      <div
        className={
          spinner
            ? "border border-slate-300 text-center relative  opacity-50"
            : "border border-slate-300 text-center relative "
        }
      >
        {spinner && (
          <div className=" absolute top-[30%] left-[48%] z-10 ">
            <Spinner width="50px" height="50px" color={"text-sky-500"} />
          </div>
        )}
        <div className=" flex gap-2">
          <div
            className="  cursor-pointer  bg-slate-200 active:bg-slate-100 flex justify-center items-center rounded "
            onClick={handleFileSelectUI}
          >
            <AiOutlinePlus className=" w-[100px] h-[100px] p-10" />
          </div>
          <div className="flex gap-3 items-center  overflow-x-auto ">
            {photoSelector?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                className=" h-[100px] cursor-pointer active:opacity-50 "
                onClick={() => handleRemovePhoto(photo)}
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
