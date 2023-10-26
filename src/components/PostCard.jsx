import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  width: 300px;
  height: 405px;
  margin: 0 40px 40px 0;
  box-shadow: 0 0 2px 0;
  transition: 0.2s;
  &:hover {
    transform: translateY(-10px);
  }
  @media screen and (max-width: 500px) {
    margin: 0 0 20px 0;
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #8f8f8f;
`;

const CardImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const CardBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
`;

const TitleContainer = styled.div`
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const CardTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 0 15px;
`;
const ContentContainer = styled.div`
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;
const CardPreviewContent = styled.p`
  font-size: 18px;
  margin: 5px 15px 0 15px;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  margin-right: 5px;
  font-size: 14px;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
const SeriesContainer = styled.div`
  display: flex;
`;
const Series = styled.div`
  border-radius: 20px;
  background-color: rgb(202, 248, 226);
  font-size: 16px;
  font-weight: 600;
  padding: 0 10px;
  margin: 5px 0 0 10px;
  color: rgb(56, 56, 56);
`

const PostCard = ( {id, series, title, previewContent, thumbnail, writingTime} ) => {
  return (
    <StyledLink to={'/post/' + id}>
      <Card>
        <CardImageContainer>
          <CardImage src={thumbnail} />
        </CardImageContainer>
        <CardBottomContainer>
          <SeriesContainer>
            <Series>{series}</Series>
          </SeriesContainer>
          <TitleContainer>
            <CardTitle>{title}</CardTitle>
          </TitleContainer>
          <ContentContainer>
            <CardPreviewContent>{previewContent}</CardPreviewContent>
          </ContentContainer>
          
          <DateContainer>{writingTime.split('T')[0]}</DateContainer>
        </CardBottomContainer>
      </Card>
    </StyledLink>
    
  );
};

export default PostCard;