import React, { useState } from 'react';
import MDEditor from '../../components/InputField/MDEditor';
import SideBar from '../../components/Navigate/SideBar';
import '../../assets/pages/Post/PostWrite.css'

const PostWrite = () => {

  return (
    <div className='container'>
      <SideBar page='write' />
      
      <div className='edtior-container'>
        <h2>포스트 작성</h2>
        <MDEditor />
      </div>

    </div>
  );
};

export default PostWrite;