import React, { useState } from 'react';

const TitleInput = ( { title, changeTitleHandler } ) => {
  return (
    <input className='title-input' type='text' value={title} onChange={changeTitleHandler} placeholder='제목을 입력해주세요.' />
  );
};

export default TitleInput;