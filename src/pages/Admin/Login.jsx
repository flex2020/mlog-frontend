import React, { useState } from 'react';
import Page from '../../components/Page';
import Header from '../../components/Header';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginForm = styled.form`
  width: 500px;
  height: 240px;
  background-color: #d9d9d9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IdInput = styled.input`
  border: 1px solid black;
  width: 370px;
  height: 35px;
  margin-top: 40px;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

const PwInput = styled.input`
  border: 1px solid black;
  width: 370px;
  height: 35px;
  margin-top: 20px;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 370px;
  height: 50px;
  background-color: #d27373;
  border-radius: 10px;
  border: none;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-weight: 600;
  transition: 0.2s;
  &:hover {
    background-color: rgb(189, 82, 82);
  }
`;

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    const loginData = {
      id: id,
      password: pw
    };
    axios.post('/admin/login', loginData)
    .then(({data}) => {
      const expiresInHours = 3; // 만료 시간
      const expirationDate = new Date(new Date().getTime() + expiresInHours * 60 * 60 * 1000); // 현재시간 3시간 이후 만료
      Cookies.set('jwt', data.accessToken, { expires: expirationDate });
      navigate('/admin/management');
    })
    .catch(error => {
      alert('로그인에 실패했습니다.');
      setId('');
      setPw('');
    }) 
  }

  return (
    <Page>
      <Header showProfile={false} />
      <TitleContainer>
        <Title>관리자 로그인</Title>
      </TitleContainer>
      <FormContainer>
        <LoginForm>
          <IdInput placeholder='관리자 아이디' value={id} onChange={e => setId(e.target.value)} />
          <PwInput type='password' placeholder='관리자 비밀번호' value={pw} onChange={e => setPw(e.target.value)} />
          <Button type='submit' onClick={loginHandler}>관리자 로그인</Button>
        </LoginForm>
      </FormContainer>
    </Page>
  );
};

export default Login;