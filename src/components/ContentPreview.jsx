import React from 'react';
import styled from 'styled-components';
import PreviewCard from './PreviewCard';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 1100px;
`;

const Title = styled.h1`
  font-size: 36px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentPreview = ( {title, data} ) => {
  return (
    <Container>
      <Title>{title}</Title>
      <CardContainer>
        
      </CardContainer>
    </Container>
  );
};

export default ContentPreview;