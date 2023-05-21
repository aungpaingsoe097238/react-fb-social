import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostCreate from "./pages/posts/Create";
import PostEdit from "./pages/posts/Edit";
import PostDetail from "./pages/posts/Detail";
import NavBar from "./components/NavBar";
import { addUser } from "./features/services/authSlice";
import { useDispatch, useSelector } from "react-redux";
import app from "./firebase";
import { getAuth } from "firebase/auth";
import RouteGuard from "./components/RouteGuard";
import Cookies from "js-cookie";
import Profile from "./pages/profile/Profile";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

function App() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const userData = {
          email: user.email,
          uid: user.uid,
        };
        Cookies.set("uid", user.uid);
        dispatch(addUser({ user: userData }));
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="container mx-auto text-slate-700">
      <NavBar />
      {user && (
        <Link to={"/post-create"}>
          <div className=" fixed bottom-4 end-5 w-[50px] h-[50px] flex justify-center items-center rounded-full shadow-lg bg-sky-500 cursor-pointer hover:bg-sky-400 ">
            <AiOutlinePlus className=" text-2xl text-white" />
          </div>
        </Link>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RouteGuard>
              <Home />
            </RouteGuard>
          }
        />
        <Route
          path="/post-create"
          element={
            <RouteGuard>
              <PostCreate />
            </RouteGuard>
          }
        />
        <Route
          path="/post-edit/:id"
          element={
            <RouteGuard>
              <PostEdit />
            </RouteGuard>
          }
        />
        <Route
          path="/post/:id"
          element={
            <RouteGuard>
              <PostDetail />
            </RouteGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <RouteGuard>
              <Profile />
            </RouteGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
