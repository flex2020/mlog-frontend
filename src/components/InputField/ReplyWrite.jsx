import React from 'react';
import '../../assets/components/InputField/ReplyWrite.css';
import DefaultButton from '../Button/DefaultButton';

const ReplyWrite = ( {reply, setReply, submitHandler} ) => {
  const writerChangeHandler = (event) => {
    setReply({...reply, writer: event.target.value});
  }
  const passwordChangeHandler = (event) => {
    setReply({...reply, password: event.target.value});
  }
  const contentChangeHandler = (event) => {
    setReply({...reply, content: event.target.value});
  }
  return (
    <div className='reply-write-container'>
      <React.Fragment>
        <div>
          <input className='reply-ta-writer' placeholder='작성자' autoComplete='off' value={reply.writer} onChange={writerChangeHandler}></input>
          <input className='reply-ta-password' type='password' placeholder='비밀번호' autoComplete='off' value={reply.password} onChange={passwordChangeHandler}></input>
        </div>
        <textarea className='reply-ta-content' placeholder='댓글을 작성하세요.' value={reply.content} onChange={contentChangeHandler}></textarea>
        <DefaultButton text='댓글 작성' onClickHandler={submitHandler}/>
      </React.Fragment>
    </div>
  );
};

export default ReplyWrite;