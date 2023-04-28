import React from 'react';
import '../../assets/components/Button/DefaultButton.css';

const DefaultButton = ( {text, onClickHandler, width, height, fontSize, color, padding, margin} ) => {
  const customStyle = {
    width: width,
    height: height,
    fontSize: fontSize,
    color: color,
    padding: padding,
    margin: margin,
  }

  return (
    <button className='btn-default' onClick={onClickHandler} style={customStyle}>{text}</button>
  );
};

export default DefaultButton;