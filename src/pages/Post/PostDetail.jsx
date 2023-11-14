import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import { Helmet } from 'react-helmet';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  width: 50%;
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
    width: 95%;
    margin: 5px auto;
  }
`;

const DateContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: end;
  @media screen and (max-width: 500px) {
    width: 95%;
    margin: 5px auto;
  }
`;

const Date = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #7f7f7f;
`;

const Series = styled.div`
  border-radius: 20px;
  background-color: rgb(202, 248, 226);
  font-size: 16px;
  font-weight: 600;
  padding: 0 10px;
  color: rgb(56, 56, 56);
  margin: auto auto auto 0;
`

const ContentContainer = styled.div`
  width: 50%;
  margin: 20px auto;
  & p {
    font-size: 20px;
  }
  & h2 {
    font-size: 32px;
  }
  & p > img {
    display: block;
    margin: 1rem auto;
  }
  @media screen and (max-width: 500px) {
    width: 95%;
    margin: 5px auto;
  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '제목 불러오는 중..',
    series: '시리즈 불러오는 중..',
    content: '내용 불러오는 중..',
    writingTime: '작성날짜 불러오는 중..',
  });

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
    .then(( {data} ) => {
      setPost(data);
    })
    .catch((error) => {
      console.log(error);
    });

  }, [id]);

  return (
    <Page>
      <Helmet>
        <title>{post.title} : Mlog</title>
      </Helmet>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>{post.title}</Title>
      </TitleContainer>
      <DateContainer>
        {post.series &&
          <Series>{post.series}</Series>
        }
        <Date>{(post.writingTime || '').split('T')[0]}</Date>
      </DateContainer>
      <ContentContainer>
        <MDEditor.Markdown 
          className='viewer'
          source={post.content} />
      </ContentContainer>
    </Page>
  );
};

export default PostDetail;