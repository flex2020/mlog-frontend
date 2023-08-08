import React from 'react';
import Page from '../../components/Page';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import styled from 'styled-components';
import PostCard from '../../components/PostCard';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(100% - 520px);
  margin: 0 auto;
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
    </Page>
  );
};

export default PostList;