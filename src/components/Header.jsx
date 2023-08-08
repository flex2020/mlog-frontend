import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';

const StyledHeader = styled.header`
  height: 270px;
`;
const NavBar = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 35px;
  background-color: #383838;
  padding: 10px 0 10px 450px;
`;
const HomeLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 600px;
  font-weight: bold;
  font-size: 23px;
  &:active {
    color: white;
  }
  &:hover {
    color: #CAF8E2;
  }
`
const NavbarLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 50px;
  font-weight: 600;
  font-size: 23px;
  &:active {
    color: white;
  }
`
const Background = styled.div`
  background-color: #CAF8E2;
  height: 250px;
`;

const ProfileCardConatiner = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -92.5px;
`;


const Header = ( props ) => {
  return (
    <StyledHeader>
      <NavBar>
        <HomeLink to='/'>Mlog</HomeLink>
        <NavbarLink to='/post'>Develop Post</NavbarLink>
        <NavbarLink to='/project'>Project</NavbarLink>
        <NavbarLink to='/resume'>Resume</NavbarLink>
      </NavBar>
      <Background />
      {props.showProfile && (
        <ProfileCardConatiner>
          <ProfileCard />
        </ProfileCardConatiner>
      )}
    </StyledHeader>
  );
};

export default Header;