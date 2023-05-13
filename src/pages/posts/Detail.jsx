import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";
import Post from "../../components/Post";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const postSelector = useSelector((state) => state?.post?.post);
  const [post, setPost] = useState("");

  const getCurrentPost = () => {
    if (!postSelector) {
      setIsLoading(true);
      navigate("/");
    } else {
      setIsLoading(false);
      setPost(postSelector);
    }
  };

  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <PostDetail post={ post } />
        </>
      )}
    </div>
  );
};

function PostDetail({ post }) {
  return (
    <div>
        <span>{post.email}</span>
    </div>
  );
}

export default Detail;
