import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/components/Navigate/SideBar.css'

const SideBar = ( {categoryHandler, category} ) => {
  const [categories, setCategories] = useState([]);
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
        <Link to={'/'} onClick={() => categoryHandler(0)}>Mlog</Link>
      </div>
      <ul>
        <li className={category === 0 ? 'active' : ''} onClick={() => categoryHandler(0)}>
        <Link to={'/'}>전체 보기</Link>
        </li>
        {categories.map((categoryObject) => {
          return (
            <li key={categoryObject.id} className={category === categoryObject.id ? 'active' : ''} onClick={() => categoryHandler(categoryObject.id)}>
              <Link to={'/'}>{categoryObject.categoryName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;