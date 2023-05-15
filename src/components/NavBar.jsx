import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="  sticky top-0 p-4 rounded shadow bg-white z-10 ">
      <div className=" w-[80%] mx-auto  flex justify-between items-center ">
        <ul>
          <li className=" font-bold ">
            <Link to={'/'}>
              Social
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
