import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/components/Navigate/SideBar.css'

const SideBar = ( { categoryHandler } ) => {
  const [categories, setCategories] = useState([]);
  const [option, setOption] = useState(0);
  const CATEGORY_API= process.env.REACT_APP_CATEGORY_API ?? '';

  useEffect(() => {
    const getCategories = async() => {
      const { data } = await axios.get(CATEGORY_API);
      setCategories(data);
    }
    getCategories();
  }, []);
  return (
    <div className="sidebar">
      <div className='sidebar-container'>
        <Link to={'/post'} 
        onClick={() => {
          if(categoryHandler) categoryHandler(0);
          setOption(0);
        }}>Mlog</Link>
      </div>
      <ul className='category-list'>
        <li className={option === 0 ? 'active' : ''} 
          onClick={() => {
            categoryHandler(0);
            setOption(0);
            }}>
          <Link to={'/post'}>전체 보기</Link>
        </li>
        {categories.map((categoryObject) => {
          return (
            <li key={categoryObject.id} className={option === categoryObject.id ? 'active' : ''} 
                onClick={() => {
                  if(categoryHandler) categoryHandler(categoryObject.id);
                  setOption(categoryObject.id);
                }}>
              <Link to={'/post'}>{categoryObject.categoryName}</Link>
            </li>
          );
        })}
      </ul>
      <ul className='sidebar-control'>
        <li className={option === -1 ? 'active' : ''}>
          <Link 
            
            to={'/post/write'}
            onClick={() => {
              setOption(-1);
            }}>포스트 작성</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;