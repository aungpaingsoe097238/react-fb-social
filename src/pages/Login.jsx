import { useState } from "react";
import app from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/services/authSlice"

function Login() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("aps@gmail.com");
  const [password, setPassword] = useState("password");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if(user.uid){
          const userData = {
            'email' : user.email,
            'uid'   : user.uid
          }
          dispatch(addUser(userData));
          navigate('/')
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        logError(errorMessage);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="w-full md:basis-1/4 flex flex-col gap-3 " >
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
        <button className=" border p-2 bg-sky-500 text-white active:bg-orange-300 rounded" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
