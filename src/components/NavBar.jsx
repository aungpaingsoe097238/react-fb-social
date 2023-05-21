import React from "react";
import { Link } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import app from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import t from "../assets/demo/images (2).png";

const NavBar = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove("uid");
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="  sticky top-0 p-2 rounded shadow bg-white z-10 ">
      <div className=" w-[80%] mx-auto  flex justify-between items-center ">
        <ul>
          <li className=" font-bold ">
            <Link to={"/"}>Social</Link>
          </li>
        </ul>
        <ul className="flex gap-2 justify-center items-center">
          <li>
            <Link to={"/profile"}>
              <div className=" flex justify-center items-center gap-2 cursor-pointer ">
                <span className=" text-sm font-bold ">Aung Paing Soe</span>
                <img
                  src={t}
                  className=" w-[35px] h-[35px] object-cover rounded-full  "
                  alt=""
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
