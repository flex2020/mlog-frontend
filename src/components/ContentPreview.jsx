import React from 'react';
import styled from 'styled-components';
import PreviewCard from './PreviewCard';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 450px 50px;
  width: 1100px;
  @media screen and (max-width: 500px) {
    width: 95%;
    margin: 0 auto 30px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ShowMoreContainer = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 5px;
  @media screen and (max-width: 500px) {
    width: 85%;
    margin-bottom: 0;
    justify-content: end;
  }
`

const ShowMore = styled(Link)`
  color: black;
  font-weight: 600;
  font-size: 20px;
  height: 20px;
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
      <Title>{title}</Title>
      <CardContainer>
        {Array.isArray(data) ? data.map((content) => {
            return (
              <PreviewCard key={content.id} id={content.id} title={content.title} thumbnail={content.thumbnail} type={eType}/>
            );
          }) : null}
        {data.length === 3 &&
        <ShowMoreContainer>
          <ShowMore to='/post'>더 보기</ShowMore>
        </ShowMoreContainer>
        }
      </CardContainer>
      {data.length === 0 &&
          <NoDataText>아직 작성된 {type}가 없어요..</NoDataText>
      }
    </Container>
  );
};

export default ContentPreview;