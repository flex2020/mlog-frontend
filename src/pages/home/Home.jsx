import React from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import styled from 'styled-components';
import ContentPreview from '../../components/ContentPreview';
import { useState } from 'react';

const Margin = styled.div`
  height: 120px;
`;


const Home = () => {
  const [postPreviews, setPostPreviews] = useState([]);
  return (
    <Page>
      <Header showProfile={true} />
      <Margin />
      <ContentPreview title='개발 포스트' data={postPreviews} />
    </Page>
  );
};

export default Home;