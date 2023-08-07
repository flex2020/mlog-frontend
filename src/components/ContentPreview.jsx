import React from 'react';
import styled from 'styled-components';
import PreviewCard from './PreviewCard';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 450px;
  width: 1100px;
`;

const Title = styled.h1`
  font-size: 36px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`;

const ShowMoreContainer = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 5px;
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
        {data.map((content) => {
            return (
              <PreviewCard key={content.id} id={content.id} title={content.title} thumbnail={content.thumbnail} type={eType}/>
            )
          })}
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