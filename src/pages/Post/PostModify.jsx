import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import styled from 'styled-components';
import Header from '../../components/Header';
import MDEditor from '../../components/MDEditor';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { marked } from 'marked';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  
`;

const TitleInput = styled.input`
  border: none;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 30px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #a1a1a1;
  }
`;

const ButtonContainer = styled.div`
  width: 50%;
  margin: 20px auto 40px auto;
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  background-color: #d27373;
  color: white;
  margin-left: 20px;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const PostModify = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('/api/post/' + id)
    .then(( {data} ) => {
      setTitle(data.title);
      setContent(data.content);
    })
  }, [id]);

  const uploadHandler = (event) => {
    event.preventDefault();
    if (!window.confirm('포스트를 저장하시겠습니까?')) return;
    const jwt = Cookies.get('jwt');
    const previewContent = marked(content).replace(/<[^>]*>?/g, '').substring(0, 255);
    const regex = /!\[.*\]\((.*)\)/g;
    const fileList = [];

    let file;
    const exts = [];
    while ((file = regex.exec(content)) !== null) {
      const uuid = file[1].substring(file[1].lastIndexOf('/') + 1, file[1].lastIndexOf('.'));
      const ext = file[1].substring(file[1].lastIndexOf('.') + 1);
      exts.push(ext);
      fileList.push(uuid);
    }

    const data = {
      id: id,
      title: title,
      content: content,
      previewContent: previewContent,
      thumbnail: fileList.length > 0 ? `/api/files/original/${fileList[0]}.${exts[0]}` : null,
      fileList: fileList,
      visible: true,
    }
    axios.put('/api/post', data, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
        .then(response => {
          alert('포스트를 성공적으로 저장하였습니다.');
          navigate('/admin/management');
        })
        .catch(error => {
          alert('포스트 저장에 실패하였습니다.');
          console.log(`Error: ${error}`);
        })
  }

  return (
    <Page>
      <Helmet>
        <title>{title} - 포스트 수정 | Mlog</title>
      </Helmet>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>포스트 수정</Title>
      </TitleContainer>
      <Container>
        <TitleInput placeholder='제목을 입력해주세요.' value={title} onChange={e => setTitle(e.target.value)} />
        <MDEditor content={content} setContent={setContent} />
      </Container>
      <ButtonContainer>
        <Button onClick={uploadHandler}>포스트 수정</Button>
      </ButtonContainer>
      
    </Page>
  );
};

export default PostModify;