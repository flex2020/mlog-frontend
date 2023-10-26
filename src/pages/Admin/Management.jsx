import React from 'react';
import Page from '../../components/Page'
import Header from '../../components/Header';
import styled from 'styled-components';
import ManagementTable from '../../components/ManagementTable';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoutButton = styled.button`
  font-size: 20px;
  font-weight: 600;
  color: white;
  background-color: #d27373;
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const SeriesManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const SeriesTopContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
`;

const SeriesTitle = styled.p`
  font-size: 32px;
  font-weight: 600;
  margin: 0 auto 0 0;
`;

const SeriesCardContainer = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 50%;
  margin: 20px auto;
`;

const SeriesCard = styled.div`
  background-color: white;
  color: black;
  padding: 10px 15px;
  margin: 10px 20px 0 0;
  border-radius: 15px;
  border: 1px solid #939393;
`;

const SeriesInput = styled.input`
  border-radius: 12px;
  border: 1px solid #a0a0a0;
  margin: auto 0 auto auto;
  height: 30px;
  padding-left: 5px;
`;

const SeriesDeleteButton = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  background-color: #000000aa;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Modal = styled.div`
  z-index: 10000;
  background-color: white;
  border-radius: 20px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  width: 30%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  & input {
    margin-bottom: 10px;
    font-size: 18px;
    border: 1px solid #a0a0a0;
    border-radius: 8px;
    padding: 5px;
  }
  & button {
    font-size: 18px;
    margin-bottom: 10px;
    background-color: #d27373;
    color: white;
    padding: 5px 20px;
    font-weight: 600;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
`;

const Management = () => {
  const [posts, setPosts] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [inputSeries, setInputSeries] = useState('');
  const [projects, setProjects] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [orginalSeries, setOrginalSeries] = useState('');
  const [changeSeries, setChangeSeries] = useState('');
  const navigate = useNavigate();
  const jwt = Cookies.get('jwt');

  const logoutHandler = () => {
    axios.post('/api/admin/logout')
    .then(() => {
      alert('로그아웃이 완료되었습니다.');
      navigate('/');
    })
    .catch((error) => {
      alert('로그아웃에 실패했습니다.');
      console.log(error);
    })
  }

  const addSeries = (event) => {
    if (event.key === 'Enter') {
      if (!window.confirm(`시리즈를 추가하시겠습니까?\n추가할 시리즈: ${inputSeries}`)) return;
      const data = {
        series: inputSeries
      };
      axios.post('/api/admin/series', data, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
          .then(response => {
            alert('시리즈를 추가하였습니다.');
            const newSeriesList = [...seriesList];
            const temp = {
              series: inputSeries
            };
            newSeriesList.push(temp);
            setInputSeries('');
            setSeriesList(newSeriesList);
          })
          .catch(({response}) => {
            if (response.status === 409) {
              alert('해당 시리즈가 이미 존재합니다.\n다시 시도해주세요.');
            } else {
              alert('시리즈를 추가하는 중 서버에서 오류가 발생하였습니다.');
            }
            setInputSeries('');
          })
    }
  }

  const seriesDeleteHandler = (series) => {
    if (!window.confirm(`정말 해당 시리즈를 삭제하시겠습니까?\n삭제하려는 시리즈: ${series}`)) return;
    axios.delete(`/api/admin/series/${series}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(() => {
      alert('성공적으로 시리즈가 삭제되었습니다.');
      const newSeriesList = seriesList.filter(item => item.series !== series);
      setSeriesList(newSeriesList)
    })
    .catch(({response}) => {
      if (response.status === 409) {
        alert('해당 시리즈와 연관된 포스트가 존재합니다.\n포스트를 삭제 후 다시 시도해주세요.');
      } else {
        alert('시리즈를 삭제하는 중 서버에서 오류가 발생하였습니다.');
      }
      
    });
  };
  const cancelHandler = (e) => {
    setModalVisible(false);
  }
  const modalHandler = (e) => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') return;
    setOrginalSeries(e.target.getAttribute('data-value'));
    setChangeSeries(e.target.getAttribute('data-value'));
    setModalVisible(true);
  }
  const seriesChangeHandler = () => {
    if (changeSeries === orginalSeries) {
      alert('기존 시리즈와 같은 이름으로의 변경은 불가능합니다.');
      return;
    }
    for (let i=0; i<seriesList.length; i++) {
      if (seriesList[i].series === changeSeries) {
        alert('이미 동일한 시리즈가 존재합니다.')
        return;
      }
    }
    if (!window.confirm(`정말 아래와 같이 시리즈를 변경하시겠습니까?\n${orginalSeries} -> ${changeSeries}`)) return;
    const data = {
      originalSeries: orginalSeries,
      newSeries: changeSeries,
    };
    axios.put('/api/admin/series', data, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then(() => {
      alert('성공적으로 시리즈가 변경되었습니다.');
      const newSeriesList = [...seriesList];
      for (let i=0; i<newSeriesList.length; i++) {
        if (newSeriesList[i].series === orginalSeries) {
          newSeriesList[i].series = changeSeries;
          break;
        }
      }
      setSeriesList(newSeriesList);
      setChangeSeries('');
      setOrginalSeries('');
      setModalVisible(false);
    })
    .catch((e) => {
      alert('서버에서 시리즈 변경에 실패하였습니다.');
    })
  }
  useEffect(() => {
    axios.get('/api/admin/postList', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setPosts(data);
      }
    })
    .catch((error) => {
      alert('포스트를 불러오는 중 오류가 발생했습니다.');
    });

    axios.get('/api/admin/seriesList', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setSeriesList(data);
      }
    })
    .catch((error) => {
      alert('시리즈를 불러오는 중 오류가 발생했습니다.');
    });

    axios.get('/api/admin/projectList', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(( {data} ) => {
      if (Array.isArray(data)) {
        setProjects(data);
      }
    })
    .catch((error) => {
      alert('프로젝트를 불러오는 중 오류가 발생했습니다.');
    });
  }, [jwt])

  return (
    <Page>
      <Helmet>
        <title>통합관리 | Mlog</title>
      </Helmet>
      <Header showProfile={false} />
      {isModalVisible && (
        <div>
          <ModalOverlay onClick={cancelHandler} />
          <Modal>
            <h2>시리즈 변경</h2>
            <input
              type="text"
              placeholder='바꿀 시리즈 명 입력'
              value={changeSeries}
              onChange={e => setChangeSeries(e.target.value)}
            />
            <button onClick={seriesChangeHandler}>저장</button>
          </Modal>
        </div>
      )}
      <TitleContainer>
        <Title>통합 관리</Title>
      </TitleContainer>
      <ButtonContainer>
        <LogoutButton onClick={logoutHandler}>관리자 로그아웃</LogoutButton>
      </ButtonContainer>
      <ManagementTable type='포스트' itemList={posts} />
      <SeriesManagementContainer>
        <SeriesTopContainer>
          <SeriesTitle>시리즈 관리</SeriesTitle>
          <SeriesInput placeholder='추가할 시리즈 입력' value={inputSeries} onChange={e => setInputSeries(e.target.value)} onKeyUp={addSeries} />
        </SeriesTopContainer>
        <SeriesCardContainer>
          {
            seriesList.map((series) => {
              return (
                <SeriesCard data-value={series.series} onContextMenu={modalHandler}>
                  {series.series}
                  <SeriesDeleteButton key={series.series} onClick={e => seriesDeleteHandler(series.series)}>X</SeriesDeleteButton>
                </SeriesCard>
              )
            })
          }
        </SeriesCardContainer>
      </SeriesManagementContainer>
      <ManagementTable type='프로젝트' itemList={projects} />
    </Page>
  );
};

export default Management;