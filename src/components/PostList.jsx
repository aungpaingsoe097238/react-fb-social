import React, { useEffect, useState } from "react";
import app from "../firebase";
import { getDatabase, ref, onValue, get } from "firebase/database";
import Post from "./Post";
import Loading from "./Loading";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const database = getDatabase(app);

  const getAllPosts = async () => {
    const postRef = ref(database, "posts");
    const snapshot = await get(postRef); // retrieve data once using get function
    if (snapshot.exists()) {
      const data = snapshot.val();
      setPosts(Object.values(data).reverse());
      setIsLoading(false); // Set isLoading to false once data is loaded
    } else {
      console.log("No data available");
      setIsLoading(false); // Set isLoading to false if there is no data
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <Loading />
          <Loading />
          <Loading />
        </>
      ) : (
        posts?.map((post, index) => {
          return <Post key={index} post={post} />;
        })
      )}
    </div>
  );
};

export default PostList;
