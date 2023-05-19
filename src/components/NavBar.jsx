import React from "react";
import { Link } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import app from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('uid') 
      navigate('/login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <div className="  sticky top-0 p-4 rounded shadow bg-white z-10 ">
      <div className=" w-[80%] mx-auto  flex justify-between items-center ">
        <ul>
          <li className=" font-bold ">
            <Link to={"/"}>Social</Link>
          </li>
        </ul>
        <ul className="flex gap-2 justify-center items-center">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <AiOutlinePoweroff onClick={handleLogout} className=" text-2xl text-rose-500 cursor-pointer " />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
