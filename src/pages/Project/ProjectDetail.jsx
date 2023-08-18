import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Header from '../../components/Header';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import { Helmet } from 'react-helmet';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const DurationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Duration = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #D27373;
  margin: 0;
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Summary = styled.p`
  font-size: 40px;
  font-weight: 600;
  color: #929292;
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

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    title: '제목 불러오는 중..',
    duration: '기간 불러오는 중..',
    summary: '프로젝트 요약 불러오는 중..',
    content: '본문 내용 불러오는 중..',
    skills: '사용한 기술 불러오는 중..',
    learning: '배운 점 불러오는 중..',
  });

  useEffect(() => {
    axios.get('/project/' + id)
    .then(( {data} ) => {
      setProject(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Page>
      <Helmet>
        <title>{project.title} | Mlog</title>
      </Helmet>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>{project.title}</Title>
      </TitleContainer>
      <DurationContainer>
        <Duration>{project.duration}</Duration>
      </DurationContainer>
      <SummaryContainer>
        <Summary>˝ {project.summary} ˝</Summary>
      </SummaryContainer>
      <ContentContainer>
        <MDEditor.Markdown 
          className='viewer'
          source={project.content} />
      </ContentContainer>
    </Page>
  );
};

export default ProjectDetail;