import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import '../../assets/pages/Post/PostView.css';
import ReplyCard from '../../components/Card/ReplyCard';
import getDate from '../../utils/getDate';
import ReplyWrite from '../../components/InputField/ReplyWrite';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const POST_API = process.env.REACT_APP_POST_API ?? '';

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`${POST_API}/${id}`);
      const pdate = getDate(data.postedDate);
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
          <ReplyWrite />
          {post.replyList.map((reply) => {
            return (<ReplyCard id={reply.replyId} writer={reply.writer} content={reply.content} date={reply.date} toReply={reply.toReply} visible={reply.visible} />)
          })}
        </div>
      </div>
    </div>
  );
};

export default PostView;