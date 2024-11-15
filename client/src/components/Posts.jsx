import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import PostsCard from "./PostsCard";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [excludeWords, setExcludeWords] = useState([]);
  const [isTrue, setIsTrue] = useState(false);



  async function getPosts(event) {
    event.preventDefault();
    const { data } = await axiosInstance.get("/posts");
        console.log(data);
    setPosts(data.posts);

  }

  async function getFilteredPosts(event) {
    event.preventDefault();
    const { data } = await axiosInstance.post("/posts/filtered", { searchQuery, excludeWords });
        console.log(data);
    setPosts(data.posts);

  }

  useEffect(() => {
    getPosts();
    
  }, [isTrue]);

  return (
    <>
      <form className="registration-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Enter your email"
          className="registration-form__input"
        />
        <input
          type="text"
          value={excludeWords}
          minLength={3}
          onChange={(event) => setExcludeWords(event.target.value)}
          placeholder="Enter your password"
          className="registration-form__input"
        />
        <button onChange={()=>setIsTrue((prev)=>!prev)} onClick={getFilteredPosts} className="btn btn-primary btn-lg mt-5">
          find
        </button>
        {posts.map((posts) => (
          <PostsCard key={posts.id} posts={posts} setPosts={setPosts} />
        ))}
      </form>
    </>
  );
}

export default Posts;
