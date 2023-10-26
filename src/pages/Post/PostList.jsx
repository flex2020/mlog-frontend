import React from 'react';
import Page from '../../components/Page';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import styled from 'styled-components';
import PostCard from '../../components/PostCard';
import { Helmet } from 'react-helmet';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
`;

const SeriesContainer = styled.div`
  display: flex;
  margin: 0 auto 40px;
  width: calc(100% - 520px);
  justify-content: center;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;
const SeriesCard = styled.div`
  background-color: white;
  color: black;
  padding: 10px 15px;
  margin: 10px 20px 0 0;
  border-radius: 15px;
  border: 1px solid #939393;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #939393;
    color: white;
  }
`;

const SelectedSeriesCard = styled.div`
  background-color: #939393;
  color: white;
  padding: 10px 15px;
  margin: 10px 20px 0 0;
  border-radius: 15px;
  border: 1px solid #939393;
  transition: 0.2s;
  cursor: pointer;
`;

const SequenceButtonContainer = styled.div`
  display: flex;
  margin: 0 auto 40px;
  width: calc(100% - 520px);
  justify-content: center;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const LatestButton = styled.button`
  border-radius: 10px 0 0 10px;
  border: 1px solid #383838;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;

const OldestButton = styled.button`
  border-radius: 0 10px 10px 0;
  border: 1px solid #383838;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1360px;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const MsgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
`;
const NoDataMsg = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [sequence, setSequence] = useState(0);
  const [sereisList, setSeriesList] = useState([]);
  const [currentSeries, setCurrentSeries] = useState('');
  const [allPosts, setAllPosts] = useState([]);

  const sequenceClick = () => {
    if (sequence === 0) setSequence(1);
    else setSequence(0);
    posts.reverse();
  }
  const seriesClick = (e) => {
    const newPosts = allPosts.filter((post) => post.series === e.target.getAttribute('data-value'));
    setCurrentSeries(e.target.getAttribute('data-value'));
    setPosts(newPosts);
  }
  const seriesClickCancel = (e) => {
    setPosts(allPosts);
    setSequence(0);
    setCurrentSeries('');
  }


  useEffect(() => {
    axios.get('/api/post')
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setPosts(data);
        setAllPosts(data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    axios.get('/api/post/series')
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setSeriesList(data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);


  return (
    <Page>
      <Header showProfile={false}/>
      <Helmet>
        <title>개발 포스트 | Mlog</title>
      </Helmet>
      <TitleContainer>
        <Title>개발 포스트</Title>
      </TitleContainer>
      {
        sequence === 0 &&
        <SequenceButtonContainer>
          <LatestButton onClick={sequenceClick} disabled>최신 순</LatestButton>
          <OldestButton onClick={sequenceClick}>오래된 순</OldestButton>
        </SequenceButtonContainer>
      }
            {
        sequence === 1 &&
        <SequenceButtonContainer>
          <LatestButton onClick={sequenceClick}>최신 순</LatestButton>
          <OldestButton onClick={sequenceClick} disabled>오래된 순</OldestButton>
        </SequenceButtonContainer>
      }
      <SeriesContainer>
        {
          sereisList.map((series) => {
            if (series.series === currentSeries) 
              return (
                <SelectedSeriesCard onClick={seriesClickCancel} data-value={series.series}>{series.series}</SelectedSeriesCard>
              )
            else
              return (
                <SeriesCard onClick={seriesClick} data-value={series.series}>{series.series}</SeriesCard>
              )
          })
        }
      </SeriesContainer>
      
      <CardContainer>
        {
          posts.map((post) => {
            return (
              <PostCard key={post.id} id={post.id} series={post.series} title={post.title} previewContent={post.previewContent} thumbnail={post.thumbnail} writingTime={post.writingTime} />
            )
          })
        }
      </CardContainer>
      {
          posts.length === 0 &&
          <MsgContainer>
            <NoDataMsg>아직 존재하는 포스트가 없어요..</NoDataMsg>
          </MsgContainer>
        }
    </Page>
  );
};

export default PostList;