import React from 'react';
import Page from './Page';
import styled from 'styled-components';
import VisibleButton from './VisibleButton';
import { useNavigate } from 'react-router-dom';

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

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto 20px;
  width: 50%;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 0 2px 0;
`;

const TableHeadContainer = styled.div`
  display: flex;
  height: 50px;
`;

const TitleHead = styled.div`
  width: 45%;
  height: 30px;
  padding: 10px 0;
  color: white;
  background-color: #9a9a9a;
  border-right: 1px solid white;
`;

const TimeHead = styled.div`
  width: 25%;
  height: 30px;
  padding: 10px 0;
  color: white;
  background-color: #9a9a9a;
  border-right: 1px solid white;
`;

const VisibleHead = styled.div`
  width: 15%;
  height: 30px;
  padding: 10px 0;
  color: white;
  background-color: #9a9a9a;
  border-right: 1px solid white;
`;

const ModifyHead = styled.div`
  width: 15%;
  height: 30px;
  padding: 10px 0;
  color: white;
  background-color: #9a9a9a;
`;

const TableRow = styled.div`
  display: flex;
  height: 50px;
`;

const TitleItem = styled.div`
  width: 45%;
  height: 30px;
  padding: 10px 0;
  border-right: 1px solid #9a9a9a;
  border-bottom: 1px solid #9a9a9a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const TimeItem = styled.div`
  width: 25%;
  height: 30px;
  padding: 10px 0;
  border-right: 1px solid #9a9a9a;
  border-bottom: 1px solid #9a9a9a;
`;

const VisibleItem = styled.div`
  display: flex;
  justify-content: center;
  width: 15%;
  height: 30px;
  padding: 10px 0;
  border-right: 1px solid #9a9a9a;
  border-bottom: 1px solid #9a9a9a;
`;

const ModifyItem = styled.div`
  width: 15%;
  height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #9a9a9a;
`;

const ModifyButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #d27373;
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 2px 15px;
  cursor: pointer;
`;

const ManagementTable = ( {type, itemList} ) => {
  const navigate = useNavigate();
  const onClickHandler = (id, type) => {
    if (type === '포스트') navigate('/post/' + id);
    else if (type === '프로젝트') navigate('/project/' + id);
  }
  const uploadHandler = () => {
    if (!window.confirm(`${type}를 작성하시겠습니까?`)) return;
    if (type === '포스트') navigate('/admin/upload/post');
    else if (type === '프로젝트') navigate('/admin/upload/project');
  }
  const modifyHandler = (id, type) => {
    if (!window.confirm(`${type}를 수정하시겠습니까?`)) return;
    if (type === '포스트') navigate('/admin/modify/post/' + id); 
    else if (type === '프로젝트') navigate('/admin/modify/project/' + id);
  }
  return (
    <Container>
      <TopContainer>
        <Title>{type} 관리</Title>
        <Button onClick={uploadHandler}>{type} 작성</Button>
      </TopContainer>
      <TableContainer>
        <TableHeadContainer>
          <TitleHead>{type} 제목</TitleHead>
          <TimeHead>작성 날짜</TimeHead>
          <VisibleHead>공개 여부</VisibleHead>
          <ModifyHead>수정</ModifyHead>
        </TableHeadContainer>
        {
          itemList.map((item) => {
            return (
              <TableRow key={item.id}>
                <TitleItem onClick={() => onClickHandler(item.id, type)}>{item.title}</TitleItem>
                <TimeItem>{item.writingTime.split('T')[0]}</TimeItem>
                <VisibleItem>
                  <VisibleButton id={item.id} type={type} visible={item.visible} />
                </VisibleItem>
                <ModifyItem>
                  <ModifyButton onClick={() => modifyHandler(item.id, type)}>수정하기</ModifyButton>
                </ModifyItem>
              </TableRow>
            )
          })
        }
        {
          itemList.length === 0 &&
          <TableRow>
            작성된 {type}가 없습니다.
          </TableRow>
        }
      </TableContainer>
    </Container>  
  );
};

export default ManagementTable;