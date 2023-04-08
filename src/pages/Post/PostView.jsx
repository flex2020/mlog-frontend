import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import '../../assets/pages/Post/PostView.css';
import Reply from '../../components/InputField/Reply';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const POST_API = process.env.REACT_APP_POST_API ?? '';

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`${POST_API}/${id}`);
      const date = new Date(data.postedDate);
      console.log(date);
      const pdate = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;
      setPost({...data, postedDate: pdate});
    };
    getPost();
  }, [id]);

  if (!post) return null;
  
  return (
    <div className='view-background'>
      <div className='viewer-container'>
        <h1 className='view-title'>{post.title}</h1>
        <div className='post-data'>
          <span className='writer'>flex2020</span>
          <span className='dot'>·</span>
          <span className='date'>{post.postedDate}</span>
        </div>
        <div className='category-container'>
          <span className='category'>{post.category}</span>
        </div>
        <MDEditor.Markdown 
        className='viewer'
        source={post.content} />
        <hr />
        <div className='reply-container'>
          <span className='reply-count'>{post.replyList.length}개의 댓글</span>
          <Reply />
        </div>
      </div>
    </div>
  );
};

export default PostView;