import React from 'react';
import '../../assets/components/Card/PostCard.css'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import getDate from '../../utils/getDate';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const PostCard = ( {id, title, date, preview, thumbnail, replyCount} ) => {
  const link = `/post/${id}`;
  const pdate = getDate(date);
  return (
    <StyledLink to={link}>
      <div id={id} className='postcard'>
        <img src={`/files/original/${thumbnail}`} alt={title} />
        <div className='card-title'>{title}</div>
        <div className='card-body'>{preview}</div>
        <div className='card-bottom'>
          <span>{replyCount}개의 댓글</span>
          <span>작성 날짜: {pdate}</span>
        </div>
      </div>
    </StyledLink>
  );
};

export default PostCard;