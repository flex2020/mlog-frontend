import React from 'react';
import Page from '../../components/Page'
import Header from '../../components/Header';
import styled from 'styled-components';
import ManagementTable from '../../components/ManagementTable';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoutButton = styled.button`
  font-size: 20px;
  font-weight: 600;
  color: white;
  background-color: #d27373;
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const Management = () => {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.post('/api/admin/logout')
    .then(() => {
      alert('로그아웃이 완료되었습니다.');
      navigate('/');
    })
    .catch((error) => {
      alert('로그아웃에 실패했습니다.');
      console.log(error);
    })
  }

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    axios.get('/api/admin/postList', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setPosts(data);
      }
    })
    .catch((error) => {
      alert('포스트를 불러오는 중 오류가 발생했습니다.');
    });
    axios.get('/api/admin/projectList', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setProjects(data);
      }
    })
    .catch((error) => {
      alert('프로젝트를 불러오는 중 오류가 발생했습니다.');
    });
  }, [])

  return (
    <Page>
      <Helmet>
        <title>통합관리 | Mlog</title>
      </Helmet>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>통합 관리</Title>
      </TitleContainer>
      <ButtonContainer>
        <LogoutButton onClick={logoutHandler}>관리자 로그아웃</LogoutButton>
      </ButtonContainer>
      <ManagementTable type='포스트' itemList={posts} />
      <ManagementTable type='프로젝트' itemList={projects} />
    </Page>
  );
};

export default Management;