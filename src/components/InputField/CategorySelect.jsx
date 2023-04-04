import React from 'react';

const CategorySelect = ( {categories, selectedCategory, changeCategoryHandler} ) => {
  return (
    <select value={selectedCategory} onChange={changeCategoryHandler}>
    {categories.map((category) => {
      return (
        <option key={category.id} value={category.id} >{category.categoryName}</option>
      );
    })}
  </select>
  );
};

export default CategorySelect;