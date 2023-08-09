import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 380px;
  margin-bottom: 25px;
`;
const DateContainer = styled.div`
  display: flex;
  align-items: start;
  margin-right: 20px;
`;
const Date = styled.p`
  width: 140px;
  font-size: 32px;
  font-weight: 600;
  margin: 0;
`;
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 880px;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  transition: 0.2s;
  &:hover {
    scale: 102%;
  }
`;

const CardImageContainer = styled.div`
  width: 30%;
  height: 325px;
  position: relative;
  margin-left: 30px;
`;

const CardImage = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DescContainer = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 30px;
  margin-right: 30px;
`;

const ProjectTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 0;
`;

const Summary = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #909090;
  margin: 20px 0;
`;

const Skill = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const Learning = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const ProjectCard = ( {id, duration, thumbnail, title, summary, skills, learning} ) => {
  return (
    <Container>
      <DateContainer>
        <Date>{duration}</Date>
      </DateContainer>
      <StyledLink to={'/project/' + id}>
      <CardContainer>
        <CardImageContainer>
          <CardImage src={thumbnail} />
        </CardImageContainer>
        <DescContainer>
          <ProjectTitle>{title}</ProjectTitle>
          <Summary>{summary}</Summary>
          <Skill>{skills}</Skill>
          <Learning>{learning}</Learning>
        </DescContainer>
      </CardContainer>
      </StyledLink>
    </Container>
  );
};

export default ProjectCard;