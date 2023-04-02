import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MDEditor from '../../components/InputField/MDEditor';
import '../../assets/pages/Post/PostWrite.css'
import TitleInput from '../../components/InputField/TitleInput';
import CategorySelect from '../../components/InputField/CategorySelect';
import DefaultButton from '../../components/Button/DefaultButton';

const PostWrite = () => {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className='edtior-container'>
        <TitleInput />
        <CategorySelect />
        <MDEditor />
      </div>
      <div className='btn-container'>
        <DefaultButton text='나가기' 
        onClickHandler={() => {
          navigate('/post');
        }
        } />
        <DefaultButton text='포스트 저장'
        onClickHandler={() => {
          
        }} />
      </div>
    </div>
  );
};

export default PostWrite;