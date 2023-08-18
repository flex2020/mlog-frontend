import React from 'react';
import Page from '../../components/Page';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import styled from 'styled-components';
import PostCard from '../../components/PostCard';
import { Helmet } from 'react-helmet';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% - 520px);
  margin: 0 auto;
`;

const MsgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;
const NoDataMsg = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/post')
    .then(( {data} ) => {
      setPosts(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <Page>
      <Header showProfile={false}/>
      <Helmet>
        <title>개발 포스트 | Mlog</title>
      </Helmet>
      <TitleContainer>
        <Title>개발 포스트</Title>
      </TitleContainer>
      <CardContainer>
        {
          posts.map((post) => {
            return (
              <PostCard key={post.id} id={post.id} title={post.title} previewContent={post.previewContent} thumbnail={post.thumbnail} writingTime={post.writingTime} />
            )
          })
        }
      </CardContainer>
      {
          posts.length === 0 &&
          <MsgContainer>
            <NoDataMsg>아직 존재하는 포스트가 없어요..</NoDataMsg>
          </MsgContainer>
        }
    </Page>
  );
};

export default PostList;