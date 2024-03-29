import React, { useEffect } from 'react';
import Page from '../../components/Page';
import styled from 'styled-components';
import Header from '../../components/Header';
import { useState } from 'react';
import MDEditor from '../../components/MDEditor';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
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
  & img {
    display: block;
    margin: 1rem auto;
  }
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

const Category = styled.h3`
  font-size: 40px;
  font-weight: 600;
`;

const ShortInput = styled.input`
  font-size: 24px;
  font-weight: 600;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #636363;
  }
`;

const LongInput = styled.textarea`
  font-size: 20px;
  height: 170px;
  resize: none;
  border: 1px solid #636363;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #636363;
  }
`;

const ProjectModify = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [duration, setDuration] = useState('');
  const [skills, setSkills] = useState('');
  const [learning, setLearning] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/projects/' + id)
    .then(( {data} ) => {
      setTitle(data.title);
      setContent(data.content);
      setSummary(data.summary);
      setDuration(data.duration);
      setSkills(data.skills);
      setLearning(data.learning);
    })
    .catch((error) => {
      console.log(error);
      alert('프로젝트를 불러오는데에 실패했습니다.');
    })
  }, [id]);
  

  const uploadHandler = (event) => {
    event.preventDefault();
    if (!window.confirm('프로젝트를 수정하시겠습니까?')) return;
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
    const jwt = Cookies.get('jwt');
    const data = {
      id: id,
      title: title,
      content: content,
      fileList: fileList,
      thumbnail: fileList.length > 0 ? `/api/files/original/${fileList[0]}.${exts[0]}` : null,
      summary: summary,
      duration: duration,
      skills: skills,
      learning: learning,
      visible: true,
    }
    axios.put('/api/projects', data, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    })
        .then(response => {
          alert('프로젝트를 수정하였습니다.');
          navigate('/admin/management');
        })
        .catch(error => {
          alert('프로젝트 저장에 실패하였습니다.');
          console.log(`Error: ${error}`);
        })
  }

  return (
    <Page>
      <Helmet>
        <title>{title} - 프로젝트 수정 | Mlog</title>
      </Helmet>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>프로젝트 수정</Title>
      </TitleContainer>
      <Container>
        <TitleInput placeholder='프로젝트명을 입력해주세요.' value={title} onChange={e => setTitle(e.target.value)} />
        <MDEditor content={content} setContent={setContent} type="프로젝트" />
        <Category>프로젝트 요약</Category>
        <ShortInput placeholder='프로젝트에 대해 간단히 설명해주세요.' value={summary} onChange={e => setSummary(e.target.value)} />
        <Category>프로젝트 진행기간</Category>
        <ShortInput placeholder='프로젝트 진행기간을 입력해주세요. ex) 2023.01 ~2023.07' value={duration} onChange={e => setDuration(e.target.value)} />
        <Category>사용한 기술</Category>
        <ShortInput placeholder='프로젝트에서 사용한 기술을 입력해주세요. ex) Spring Boot, JPA, AWS' value={skills} onChange={e => setSkills(e.target.value)} />
        <Category>배운 점</Category>
        <LongInput placeholder='프로젝트를 진행하며 배운 점을 기술해주세요.' value={learning} onChange={e => setLearning(e.target.value)} />
      </Container>
      <ButtonContainer>
        <Button onClick={uploadHandler}>프로젝트 수정</Button>
      </ButtonContainer>

    </Page>
  );
};

export default ProjectModify;