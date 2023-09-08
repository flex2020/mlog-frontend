import React from 'react';
import styled from 'styled-components';
import PreviewCard from './PreviewCard';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto 40px;
  width: 980px;
  @media screen and (max-width: 500px) {
    width: 95%;
    margin: 0 auto 30px;
  }
`;

const Title = styled(Link)`
  font-size: 36px;
  font-weight: 600;
  text-decoration: none;
  color: black;
  margin-bottom: 15px;
`;

const CardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  text-align: center;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NoDataText = styled.p`
  font-weight: 600;
  margin: 20px auto;
  font-size: 36px;
`;

const ContentPreview = ( {title, data, type} ) => {
  const eType = type === '포스트' ? 'post' : 'project';
  return (
    <Container>
      <Title to={'/' + eType}>{title}</Title>
      <CardContainer>
        {Array.isArray(data) ? data.map((content) => {
            return (
              <PreviewCard key={content.id} id={content.id} title={content.title} thumbnail={content.thumbnail} type={eType}/>
            );
          }) : null}
      </CardContainer>
      {data.length === 0 &&
          <NoDataText>아직 작성된 {type}가 없어요..</NoDataText>
      }
    </Container>
  );
};

export default ContentPreview;