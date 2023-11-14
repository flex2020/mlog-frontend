import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import styled from 'styled-components';

const OffContainer = styled.div`
  background-color: #d9d9d9;
  width: 90px;
  height: 30px;
  border-radius: 25px;
  position: relative;
  transition: 0.2s;
  cursor: pointer;
`;

const OffBall = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
  position: absolute;
  top: 0%;
  right: 0%;
  background-color: white;
`;

const OnContainer = styled.div`
  background-color: #92F5A8;
  width: 90px;
  height: 30px; 
  border-radius: 25px;
  position: relative;
  transition: 0.2s;
  cursor: pointer;
`;

const OnBall = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
  position: absolute;
  background-color: white;
`;



const VisibleButton = ( {id, type, visible} ) => {
  const jwt = Cookies.get('jwt');

  const onClickHandler = () => {
    if (!window.confirm(`${type}의 공개여부를 변경하시겠습니까?`)) return;

    if (type === '포스트') {
      axios.post(`/api/posts/${id}/visibility`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }})
      .then(() => {
        alert('포스트의 공개여부를 변경하였습니다.');
        window.location.reload();
      })
      .catch(() => {
        alert('포스트의 공개여부 변경에 실패했습니다.');
      });
    } else if (type === '프로젝트') {
      axios.post(`/api/projects/${id}/visibility`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }})
      .then(() => {
        alert('프로젝트의 공개여부를 변경하였습니다.');
        window.location.reload();
      })
      .catch(() => {
        alert('프로젝트의 공개여부 변경에 실패했습니다.');
      });
    }
  }

  if (!visible) {
    return (
      <OffContainer onClick={onClickHandler}>
        <OffBall />
      </OffContainer>
    );
  } else {
    return (
      <OnContainer onClick={onClickHandler}>
        <OnBall />
      </OnContainer>
    );
  }
  
};

export default VisibleButton;