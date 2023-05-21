import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("aps@gmail.com");
  const [password, setPassword] = useState("password");

  const handleRegister = () => {
    
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="w-full md:basis-1/4 flex flex-col gap-3 "
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className=" border border-slate-500 p-1 w-full rounded ps-2 "
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          id="password"
          className="border border-slate-500 p-1 w-full rounded ps-2 "
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className=" border p-2 bg-sky-500 text-white active:bg-orange-300 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
