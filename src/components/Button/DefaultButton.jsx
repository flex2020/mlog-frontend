import React from 'react';
import '../../assets/components/Button/DefaultButton.css';

const DefaultButton = ( {text, onClickHandler} ) => {
  return (
    <button className='btn-default' onClick={onClickHandler}>{text}</button>
  );
};

export default DefaultButton;