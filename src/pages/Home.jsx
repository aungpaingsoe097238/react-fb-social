import React from "react";
import { useState, useEffect, useRef } from "react";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded,
} from "firebase/database";
import Login from "./Login";
import NavBar from "../components/NavBar";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { addUser  } from '../features/services/authSlice'
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state?.auth?.user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userData = {
          'email' : user.email,
          'uid'   : user.uid
        }
        dispatch(addUser({user : userData}));
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <div className="w-full lg:w-[80%] mx-auto ">
        <Post />
      </div>
      <Link to={"/post-create"}>
        <div className=" fixed bottom-4 end-5 w-[50px] h-[50px] flex justify-center items-center rounded-full shadow-lg bg-sky-500 cursor-pointer hover:bg-sky-400 ">
          <AiOutlinePlus className=" text-2xl text-white" />
        </div>
      </Link>
    </>
  );
};

export default Home;
