import React, { useEffect, useState } from "react";
import app from "../firebase";
import { getDatabase, ref, onValue, get } from "firebase/database";
import Post from "./Post";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { addCommentCount, addPostCount } from "../features/services/postSlice";

const PostList = ({ page }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const database = getDatabase(app);
  const dispatch = useDispatch();
  const userSelector = useSelector((state)=>state?.auth?.user)

  const getAllPosts = async () => {
    const postRef = ref(database, "posts");
    const snapshot = await get(postRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const posts = Object.values(data);
      if( page === 'profile' ){
       let filterPosts = posts.filter(post=>post.userUid === userSelector.uid)
        setPosts(filterPosts.reverse())
      }else{
        setPosts(posts.reverse());
        dispatch(addPostCount({ postCount: Object.values(data).length }));
      }
      setIsLoading(false);
    } else {
      console.log("No data available");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
    window.scrollTo(0, 0);
  }, [isLoading]);

  return (
    <div className=" mt-[55px]">
      {isLoading ? (
        <>
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
