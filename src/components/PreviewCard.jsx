import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  height: 330px;
  width: 310px;
  box-shadow: 0 0 2px 0;
  margin-right: 30px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: translateY(-10px);
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 240px;
  width: 100%;
  border-bottom: 1px solid #8f8f8f;
`;

const CardImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 310px;
`;

const CardTitleContainer = styled.div`
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.p`
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`

const PreviewCard = ( {id, title, thumbnail, type} ) => {
  return (
    <StyledLink to={`${type}/${id}`} >
      <Card>
        <CardImageContainer>
          <CardImage src={thumbnail} />
        </CardImageContainer>
        <CardTitleContainer>
          <CardTitle>{title}</CardTitle>
        </CardTitleContainer>
      </Card>
    </StyledLink>
    
  );
};

export default PreviewCard;