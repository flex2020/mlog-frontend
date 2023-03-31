import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostCard from '../../components/Card/PostCard';
import '../../assets/pages/Home/Home.css';
import Masonry from 'react-masonry-css';

const Home = () => {
  // server에게서 게시글 데이터 전송 받기
  const [posts, setPosts]= useState([]);
  const POST_API= process.env.REACT_APP_POST_API ?? '';
  
  useEffect(() => {
    const getPosts = async() => {
      const { data } = await axios.get(POST_API);
      console.log(data);
      setPosts(data);
    }
    getPosts();
  }, []);

  return (
    <div>
      <Masonry 
        breakpointCols={{
          default: 4,
          1100: 3,
          700: 2,
          500: 1
        }}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
        >
        {posts.map((post) => {
          return (
            <PostCard 
              key={post.postId}
              id={post.postId} 
              title={post.title} 
              date={post.postedDate} 
              preview={post.previewContent}
              thumbnail={post.thumbnail}
              replyCount={post.replyCount} />
          )
        })}
      </Masonry>
    </div>
  );
};

export default Home;