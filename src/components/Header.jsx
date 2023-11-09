import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';

const StyledHeader = styled.header`
  height: 270px;
  @media screen and (max-width: 500px) {
    height: 55px;
  }
`;
const NavBar = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 35px;
  background-color: #383838;
  padding: 10px 0 10px 450px;
  @media screen and (max-width: 500px) {
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  display: none;
  @media screen and (max-width: 500px) {
    display: block;
    right: 10px;
    height: 35px;
    padding: 0;
    border: 1px solid #383838;
    border-radius: 5px;
    background-color: rgba(0,0,0,0);
    &:active {
      border: 1px solid white;
    }
  }
`;

const ToggleMenuContainer = styled.div`
  background-color: #383838;
  position: absolute;
  top: 55px;
  width: 100%;
  z-index: -1;
`;

const ToggleMenu = styled.div`
  width: 100%;
  color: white;
  height: 30px;
  padding: 5px 0;
  text-align: center;
  border-bottom: 1px solid #484848;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
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
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;
const NavbarLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 50px;
  font-weight: 600;
  font-size: 23px;
  &:active {
    color: white;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const Background = styled.div`
  background-color: #CAF8E2;
  height: 250px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const ProfileCardConatiner = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -92.5px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;


const Header = ( props ) => {
  const navigate = useNavigate();
  const [toggleVisibility, setToggleVisibility] = useState(false);

  const toggleClickHandler = () => {
    setToggleVisibility(!toggleVisibility);
  }

  const toggleMenuClickHandler = (link) => {
    navigate(link);
  }

  return (
    <StyledHeader>
      <NavBar>
        <HomeLink to='/'>Mlog</HomeLink>
        <NavbarLink to='/post'>Develop Post</NavbarLink>
        <NavbarLink to='/project'>Project</NavbarLink>
        <ToggleButton onClick={toggleClickHandler}>
          <img src={process.env.PUBLIC_URL + '/images/list.svg'} />
        </ToggleButton>
        {toggleVisibility &&
        <ToggleMenuContainer>
          <ToggleMenu onClick={() => toggleMenuClickHandler('/post')}>Develop Post</ToggleMenu>
          <ToggleMenu onClick={() => toggleMenuClickHandler('/project')}>Project</ToggleMenu>
        </ToggleMenuContainer>
        }

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