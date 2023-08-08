import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/Page';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: end;
`;

const Date = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #7f7f7f;
`;

const ContentContainer = styled.div`
  width: 50%;
  margin: 20px auto;
  & p {
    font-size: 20px;
  }
  & h2 {
    font-size: 32px;
  }
  & img {

  }
`;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '제목 불러오는 중..',
    content: '내용 불러오는 중..',
    writingTime: '작성날짜 불러오는 중..',
  });

  useEffect(() => {
    axios.get(`/post/${id}`)
    .then(( {data} ) => {
      console.log(data);
      setPost(data);
    })
    .catch((error) => {
      console.log(error);
    });

  }, []);

  return (
    <Page>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>{post.title}</Title>
      </TitleContainer>
      <DateContainer>
        <Date>{post.writingTime.split('T')[0]}</Date>
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