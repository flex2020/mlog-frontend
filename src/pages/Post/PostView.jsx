import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import '../../assets/pages/Post/PostView.css';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const POST_API = process.env.REACT_APP_POST_API ?? '';

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`${POST_API}/${id}`);
      setPost(data);
    };
    getPost();
  }, [id]);

  if (!post) return null;
  
  return (
    <div className='view-background'>
      <div className='viewer-container'>
      <h1 className='view-title'>{post.title}</h1>
        <MDEditor.Markdown 
        className='viewer'
        source={post.content} />
      </div>
    </div>
  );
};

export default PostView;