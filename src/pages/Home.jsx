import React from "react";
import { useState, useEffect, useRef } from "react";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded
} from "firebase/database";
import Login from "./Login";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { addUser } from "../features/services/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../components/PostList";

const Home = () => {
  const auth = getAuth(app);
  const database = getDatabase(app);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userData = {
          email: user.email,
          uid: user.uid
        };
        dispatch(addUser({ user: userData }));
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
      <div className="w-full lg:w-[50%] mx-auto ">
        <PostList />
      </div>
    </>
  );
};

export default Home;
