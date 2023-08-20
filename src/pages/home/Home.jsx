import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import styled from 'styled-components';
import ContentPreview from '../../components/ContentPreview';
import { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Margin = styled.div`
  height: 120px;
`;


const Home = () => {
  const [postPreview, setPostPreview] = useState([]);
  const [projectPreview, setProjectPreivew] = useState([]);
  useEffect(() => {
    // 개발 포스트 미리보기 데이터 요청
    axios.get('/post/preview')
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setPostPreview(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
    // 프로젝트 미리보기 데이터 요청
    axios.get('/project/preview')
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setProjectPreivew(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Page>
      <Helmet>
        <title>Mlog</title>
      </Helmet>
      <Header showProfile={true} />
      <Margin />
      <ContentPreview title='개발 포스트' data={postPreview} type='포스트'/>
      <ContentPreview title='프로젝트' data={projectPreview} type='프로젝트'/>
    </Page>
  );
};

export default Home;