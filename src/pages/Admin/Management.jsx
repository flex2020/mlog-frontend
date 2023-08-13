import React from 'react';
import Page from '../../components/Page'
import Header from '../../components/Header';
import styled from 'styled-components';
import ManagementTable from '../../components/ManagementTable';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
`;

const Management = () => {
  return (
    <Page>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>통합 관리</Title>
      </TitleContainer>
      <ManagementTable />
    </Page>
  );
};

export default Management;