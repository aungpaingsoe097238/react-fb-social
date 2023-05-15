import React, { useEffect, useState } from "react";
import app from "../firebase";
import { getDatabase, ref, onValue, get } from "firebase/database";
import Post from "./Post";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { addCommentCount, addPostCount } from "../features/services/postSlice";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const database = getDatabase(app);
  const dispatch = useDispatch();

  const getAllPosts = async () => {
    const postRef = ref(database, "posts");
    const snapshot = await get(postRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setPosts(Object.values(data).reverse());
      dispatch(addPostCount({ postCount : Object.values(data).length}));
      setIsLoading(false);
    } else {
      console.log("No data available");
      setIsLoading(false); 
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
          <Loading />
          <Loading />
        </>
      ) : (
        posts?.map((post) => {
          return <Post key={post.id} post={post} />;
        })
      )}
    </div>
  );
};

export default PostList;
