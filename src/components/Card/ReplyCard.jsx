import React, { useState } from 'react';
import '../../assets/components/Card/ReplyCard.css';
import getDate from '../../utils/getDate';
import Icon from '@mdi/react';
import { mdiPlusBoxOutline, mdiMinusBoxOutline } from '@mdi/js';
import ReplyWrite from '../InputField/ReplyWrite';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';


const ReplyCard = ({replyId, writer, content, date, toReply, visible, setPost}) => {
  const { id } = useParams();
  const POST_API = process.env.REACT_APP_POST_API ?? '';
  const [mode, setMode] = useState('close');
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const defaultReply = {
    writer: '',
    password: '',
    content: '',
  };
  const [reply, setReply] = useState(defaultReply);

  const subReplyClickHandler = () => {
    if (mode === 'close') {
      setMode('open');
    }
    else {
      setReply(defaultReply);
      setMode('close');
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      writer: reply.writer,
      password: reply.password,
      content: reply.content,
      toReply: replyId,
      visible: true,
    };
    console.log(`${POST_API}/${id}/reply`);
    axios.post(`${POST_API}/${id}/reply`, data)
      .then(async response => {
        alert('댓글을 작성하였습니다.');
        axios.get(`${POST_API}/${id}`)
        .then(response => {
          setPost(response.data);
          setReply(defaultReply);
        })
      })
      .catch(error => {
        alert('댓글 작성에 실패하였습니다.');
        console.log(`Error: ${error}`);
      })
  }

  return (
    <div id={replyId} key={replyId} className='reply'>
      <div>
        <span className='reply-writer'>{writer}</span>
        <span className='dot'>·</span>
        <span className='reply-date'>{getDate(date)}</span>
        <span className='reply-delete' onClick={openModal}>삭제</span>
        <Modal isOpen={modalOpen} onRequestClose={closeModal} contentLabel='비밀번호 입력'>
          <h2>비밀번호 입력</h2>
          <input placeholder='비밀번호 입력' />
          <button type='button'>입력</button>
          <button onClick={closeModal}>닫기</button>
        </Modal>
      </div>

      <div className='reply-content'>{content}</div>
      <div className='subreply-container'>
        {mode === 'close' ? 
          <div className='subreply-click' onClick={subReplyClickHandler}>
            <Icon path={mdiPlusBoxOutline} size={1} />
            <span>답글 작성</span>
          </div>
          :
          <div className='subreply-click' onClick={subReplyClickHandler}>
            <Icon path={mdiMinusBoxOutline} size={1} />
            <span>숨기기</span>
          </div>
          }
          {mode === 'open' ? 
          <div className='write-subreply'>
            <ReplyWrite reply={reply} setReply={setReply} submitHandler={submitHandler}/>
          </div>
          : <div></div>
          }
        
      </div>
    </div>
  );
};

export default ReplyCard;