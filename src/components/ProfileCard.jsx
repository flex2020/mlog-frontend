import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  height: 185px;
  width: 185px;
`;

const ProfileComment = styled.p`
  margin: 95px 0 3px 10px;
  font-weight: 600;
`;
const UnderLine = styled.div`
  width: 235px;
  height: 0;
  margin-left: -5px;
  border-bottom: 2px solid #8f8f8f;
`;
const UnderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LinkImage = styled.img`
  margin: 35px 0 0 10px;
  width: 20px;
  height: 20px;
`;

const Name = styled.h1`
  margin: 0 0 0 35px;
  font-size: 48px;
`;

const ProfileCard = () => {
  return (
    <CardContainer>
      <ProfileImage src={process.env.PUBLIC_URL + '/images/profile.jpg'} />
      <div>
        <ProfileComment>실천으로 성장하는 백엔드 개발자</ProfileComment>
        <UnderLine />
        <UnderContainer>
          <Link to='https://github.com/flex2020' target='_blank'>
            <LinkImage src={process.env.PUBLIC_URL + '/images/github.svg'} />
          </Link>
          <Link to='https://velog.io/@flex2020' target='_blank'>
            <LinkImage src={process.env.PUBLIC_URL + '/images/velog.svg'} />
          </Link>
          <Name>노의빈</Name>
        </UnderContainer>
      </div>
      
    </CardContainer>
  );
};

export default ProfileCard;