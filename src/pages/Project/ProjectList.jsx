import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import Header from '../../components/Header';
import styled from 'styled-components';
import ProjectCard from '../../components/ProjectCard';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
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


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get('/api/projects')
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setProjects(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <Page>
      <Helmet>
        <title>프로젝트 | Mlog</title>
      </Helmet>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>프로젝트</Title>
      </TitleContainer>
      {
        projects.map(( {id, duration, thumbnail, title, summary, skills, learning} ) => {
          return (
            <ProjectCard key={id} id={id} duration={duration} thumbnail={thumbnail} title={title} summary={summary} skills={skills} learning={learning} />
          )
        })
      }
      {
        projects.length === 0 &&
        <MsgContainer>
          <NoDataMsg>아직 존재하는 프로젝트가 없어요..</NoDataMsg>
        </MsgContainer>
      }
    </Page>
  );
};

export default ProjectList;