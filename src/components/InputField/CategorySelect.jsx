import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../assets/components/InputField/CategorySelect.css';

const CategorySelect = () => {
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
    <select>
      {categories.map((category) => {
        return (
          <option value={category.id}>{category.categoryName}</option>
        );
      })}
    </select>
  );
};

export default CategorySelect;