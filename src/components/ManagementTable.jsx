import React from 'react';
import Page from './Page';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const TopContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
  margin: 0 auto 0 0;
`
const Button = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 10px;
  background-color: #d27373;
  cursor: pointer;
`;

const Table = styled.table`
  width: 50%;
  margin: 30px auto;
`;

const TableHead = styled.th`
  background-color: #9a9a9a;
  height: 50px;
  color: white;
  font-size: 20px;
`;

const ManagementTable = () => {
  return (
    <Container>
      <TopContainer>
        <Title>개발 포스트 관리</Title>
        <Button>개발 포스트 작성</Button>
      </TopContainer>
      <Table>
        <TableHead>제목</TableHead>
        <TableHead>작성 시간</TableHead>
        <TableHead>공개 여부</TableHead>
        <TableHead>수정하기</TableHead>
        <tr>
          sadfasdf
        </tr>
      </Table>
    </Container>  
  );
};

export default ManagementTable;