import { useState, useEffect } from "react";
import React from "react";
import Editor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../Button/DefaultButton";
import axios from "axios";
import { marked } from "marked";


const MDEditor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const CATEGORY_API= process.env.REACT_APP_CATEGORY_API ?? '';

  const navigate = useNavigate();

  const changeTitleHandler = (event) => {
    setTitle(String(event.target.value));
  }
  const changeCategoryHandler = (event) => {
    setSelectedCategory(event.target.value);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    const previewContent = marked(content).replace(/<[^>]*>?/g, '');

    const data = {
      categoryId: selectedCategory,
      title: title,
      content: content,
      previewContent: previewContent,
      fileList: [],
      visible: true,
    }
    axios.post(process.env.REACT_APP_POST_API, data)
        .then(response => {
          alert('포스트를 성공적으로 저장하였습니다.');
          navigate('/post');
        })
        .catch(error => {
          alert('포스트 저장에 실패하였습니다.');
          console.log(`Error: ${error}`);
        })
  }


  useEffect(() => {
    const getCategories = async() => {
      const { data } = await axios.get(CATEGORY_API);
      setCategories(data);
    }
    getCategories();
  }, []);


  return (
    <div>
      <input type='text' value={title} onChange={changeTitleHandler} placeholder='제목을 입력해주세요.' />
        <React.Fragment>
        <select value={selectedCategory} onChange={changeCategoryHandler}>
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id} >{category.categoryName}</option>
            );
          })}
        </select>
          <Editor value={content} height={650} onChange={(c) => setContent(c)} />
          <div className='btn-container'>
            <DefaultButton text='나가기' 
            onClickHandler={() => {
              navigate('/post');
            }
            } />
            <DefaultButton text='포스트 저장'
            onClickHandler={submitHandler} />
          </div>
        </React.Fragment>
    </div>
  );
}

export default MDEditor;