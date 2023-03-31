import React from 'react';
import '../../assets/components/Card/PostCard.css'

const PostCard = ( {id, title, date, preview, thumbnail, replyCount} ) => {
  return (
    <div id={id} className='postcard'>
      <img src={thumbnail} alt={title} />
      <div className='card-title'>{title}</div>
      <div className='card-body'>{preview}</div>
      <div className='card-bottom'>
        <span>{replyCount}개의 댓글</span>
        <span>작성 날짜: {date}</span>
      </div>
    </div>
  );
};

export default PostCard;