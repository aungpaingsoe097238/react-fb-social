import React from "react";

const Edit = () => {
  return (
    <div className=" mx-auto h-screen flex items-center justify-center ">
      <form className=" w-[50%] flex flex-col gap-2">
        <div className=" text-lg font-medium my-5 block mx-auto " >Edit Your Profile</div>
        <div className=" flex gap-2 ">
          <div className=" w-full">
            <label htmlFor="username" className="input-label">
              User Name
            </label>
            <input
              type="text"
              id="username"
              className="input-text"
              placeholder="username"
              required
            />
          </div>
          <div className=" w-full">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input-text"
              placeholder="email"
              required
            />
          </div>
        </div>
        <div className=" flex gap-2 ">
          <div className=" w-full">
            <label htmlFor="gender" className="input-label">
              Gender
            </label>
            <select className="input-text" id="gender">
              <option value={"custom"} selected>
                Custom
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </div>
          <div className=" w-full">
            <label htmlFor="birthday" className="input-label">
              Birthday
            </label>
            <input type="date" id="birthday" className="input-text" />
          </div>
        </div>
        <div>
          <input type="text" className="input-text" placeholder="your bio" />
        </div>
        <div className=" text-right">
            <button type="submit" className=" primary-btn " >Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
