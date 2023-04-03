import React, { useState } from 'react';
import MDEditor from '../../components/InputField/MDEditor';
import '../../assets/pages/Post/PostWrite.css'

const PostWrite = () => {

  return (
    <div className='container'>
      <div className='edtior-container'>
        <MDEditor />
      </div>
    </div>
  );
};

export default PostWrite;