import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostCard from '../../components/Card/PostCard';
import '../../assets/pages/Home/Home.css';
import Masonry from 'react-masonry-css';
import SideBar from '../../components/Navigate/SideBar';
import Loader from '../../components/Utils/Loader';
import NotFound from '../../components/Utils/NotFound';

const Home = () => {
  const [posts, setPosts]= useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [prepared, setPrepared] = useState(false);

  const POST_API= process.env.REACT_APP_POST_API ?? '';
  
  const selectCategoryHandler = (category) => {
    setCurrentCategory(category);
  }

  useEffect(() => {
    const getPosts = async() => {
      setPrepared(false);
      const { data } = await axios.get(`${POST_API}?category=${currentCategory}`);
      console.log(`${POST_API}?category=${currentCategory}`);
      setPosts(data);
      setPrepared(true);
    }
    getPosts();
  }, [currentCategory]);

  return (
    <div className='post-container'>
      <SideBar categoryHandler={selectCategoryHandler} category={currentCategory} />
      <div className={prepared ? 'prepared-content' : 'content'}>
      {prepared ? (
        (posts.length === 0) ?
        <NotFound /> : 
          <Masonry
        breakpointCols={{
          default: 4,
          1000: 3,
          800: 2,
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
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Home;