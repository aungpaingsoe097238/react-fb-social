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

const auth = getAuth(app);
const database = getDatabase(app);

const Chat = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const messagesRef = ref(database, "chats");
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      const messageList = [];
      for (let id in messageData) {
        messageList.push({ id, ...messageData[id] });
      }
      setMessages(messageList);
      console.log(messageList);
      scrollToBottom();
    });
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    const newMessage = {
      text: message,
      timestamp: Date.now(),
      senderId: user.uid,
      senderEmail: user.email,
      receiverId: 23243
    };
    set(ref(database, `chats/${Date.now()}`), newMessage);
    setMessage("");
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  };

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <div className=" flex ">
        <div className=" flex-none ">
          <span>{auth.currentUser.email ? auth.currentUser.email : ""}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className=" flex-1">
          <div className=" h-screen flex flex-col justify-between overflow-scroll">
            <ul className=" ">
              {messages.map((message) => (
                <li
                  key={message.id}
                  className=" p-1 me-5 rounded-lg my-2 inline-block bg-slate-200"
                >
                  <div className="text-xs font-bold text-slate-500 flex gap-2">
                    <p>{message.senderEmail}</p>
                    <p>{new Date(message.timestamp).toLocaleString()}</p>
                  </div>

                  <p className=" my-2 ">{message.text}</p>
                </li>
              ))}
              <li ref={messageEndRef}></li>
            </ul>

            <form onSubmit={handleSend}>
              <div className=" flex">
                <input
                  type="text"
                  value={message}
                  className="border py-2 px-1 rounded-s"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder=" Message ... "
                />
                <button
                  className=" py-2 px-3 bg-slate-700 text-white shadow-sm rounded-e "
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
