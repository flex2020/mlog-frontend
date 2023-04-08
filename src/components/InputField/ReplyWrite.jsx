import React from 'react';
import '../../assets/components/InputField/ReplyWrite.css';
import DefaultButton from '../Button/DefaultButton';

const ReplyWrite = () => {
  return (
    <div className='reply-write-container'>
      <div>
        <input className='reply-ta-writer' placeholder='작성자' autoComplete='off'></input>
        <input className='reply-ta-password' type='password' placeholder='비밀번호' autoComplete='off'></input>
      </div>
      <textarea className='reply-ta-content' placeholder='댓글을 작성하세요.'></textarea>
      <DefaultButton text='댓글 작성' />
    </div>
  );
};

export default ReplyWrite;