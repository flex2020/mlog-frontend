import React from 'react';
import '../../assets/components/Card/ReplyCard.css';
import getDate from '../../utils/getDate';

const ReplyCard = ({id, writer, content, date, toReply, visible}) => {
  return (
    <div id={id} key={id} className='reply'>
      <div>
        <span className='reply-writer'>{writer}</span>
        <span className='dot'>·</span>
        <span className='reply-date'>{getDate(date)}</span>
      </div>

      <div className='reply-content'>{content}</div>
      <div className='write-subreply'>
        <button>
          답글 작성
        </button>
      </div>
    </div>
  );
};

export default ReplyCard;